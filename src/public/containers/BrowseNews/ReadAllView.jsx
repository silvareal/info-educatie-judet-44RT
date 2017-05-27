import React, {Component} from 'react';

import ReadAll from '../../components/BrowseNews/Main Components/ReadAll.jsx';

class ReadAllView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: '',
            news: [],
            loadAfter: 0,
            finished: false,
            searchErrorMessage: '',
            newsPreSearch: [],
            searchQuery: '',
            searching: false,
            fetchedNews: false
        };
    };

    getNews = () => {
        this.setState({
            errorMessage: 'Fetching'
        });
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/browse/readAllNews');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    errorMessage: 'Fetched news',
                    news: xhr.response.news,
                    newsPreSearch: xhr.response.news,
                    fetchedNews: true
                });
            }
            else if (xhr.status === 404) {
                this.setState({
                    errorMessage: xhr.response.message,
                    fetchedNews: true
                });
            }
            else {
                this.setState({
                    errorMessage: 'Please contact an administrator',
                    fetchedNews: true
                })
            }
        });

        xhr.send();
    };

    onScroll = (e) => {
        if (this.state.finished === false && document.title === "Manage news" && this.state.searching === false)
            if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - 300) {
                this.loadMore();
            }
    };

    componentDidMount() {
        this.getNews();

        //the load more event listener
        window.addEventListener('scroll', this.onScroll);
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    loadMore = () => {
        if (this.state.finished === false) {
            this.loadAndAppendNews(this.state.loadAfter + 10);
            this.setState({loadAfter: this.state.loadAfter + 10})
        }
    };

    loadAndAppendNews = (loadAfter) => {

        if (this.state.finished === false) {
            const loadAfterParam = encodeURIComponent(loadAfter);

            const formData = `loadAfter=${loadAfterParam}`;

            const xhr = new XMLHttpRequest();
            xhr.open('post', '/browse/loadMoreNews');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.responseType = 'json';
            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {

                    if (xhr.response.message === "NoNews"){
                        this.setState({finished: true});
                    }
                    else {
                        //Do this to not mutate state
                        let newNews = this.state.news;

                        Object.keys(xhr.response.news).map((key) => {
                            newNews.push(xhr.response.news[key]);
                        });

                        this.setState({news: newNews, newsPreSearch: newNews});
                    }
                }
            });
            xhr.send(formData);
        }
    };

    onQueryChange = (e) => {
        if (e.target.value.length === 0) {
            this.setState({searchQuery: e.target.value, searching: false, news: this.state.newsPreSearch})
        }
        else
            this.setState({searchQuery: e.target.value});
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onSearch();
        }
    };

    onSearch = () => {

        //if the search box is not empty
        if (this.state.searchQuery){

            const searchQuery = encodeURIComponent(this.state.searchQuery);

            const formData = `searchQuery=${searchQuery}`;

            const xhr = new XMLHttpRequest();
            xhr.open('post', '/browse/searchNews');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.responseType = 'json';
            xhr.addEventListener('load', () => {
                if (xhr.status === 200){

                    //no news found
                    if (xhr.response.errorMessage) {
                        this.setState({searchErrorMessage: xhr.response.errorMessage, news:[]});
                    }
                    else {
                        this.setState({news: xhr.response.news})
                    }
                }
            });

            if (this.state.searchErrorMessage.length === 0)
                xhr.send(formData);
            this.setState({searching: true});
        }
        else {
            this.setState({news: this.state.newsPreSearch});
        }
    };

    render() {
        document.title = "Manage news";
        return (
            <div>
                <ReadAll
                    fetchedNews={this.state.fetchedNews}
                    userId={this.props.params._id}
                    news={this.state.news}
                    errorMessage={this.state.errorMessage}
                    handleKeyPress={this.handleKeyPress}
                    onQueryChange={this.onQueryChange}
                    searchQuery={this.state.searchQuery}
                    onSearch={this.onSearch}
                />
            </div>
        );
    }
}

export default ReadAllView