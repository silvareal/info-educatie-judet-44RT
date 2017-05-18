import React, {Component} from 'react'
import {Link} from 'react-router'
import {RaisedButton} from 'material-ui';

class ViewRow extends Component {
    render() {
        return (
            <div className="list">
                <div>
                    <div>
                        {this.props.collection.collectionName}
                        <div>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis luctus massa et velit porta,
                            sed iaculis ante euismod. Aenean egestas tortor eget enim vulputate, ac tincidunt nibh
                            euismod. Sed congue finibus placerat. Integer ac diam mattis, feugiat tellus id, elementum
                            purus. Duis condimentum accumsan posuere. Mauris quis risus dapibus mi feugiat volutpat eu
                            non ligula. Ut pellentesque fermentum lacus vel finibus. Fusce rhoncus dui elit, non pretium
                            ex pretium in. Phasellus facilisis sed leo in egestas. Etiam vehicula magna nunc, convallis
                            venenatis nibh gravida sit amet.

                            Morbi nec aliquet magna, ac sodales ipsum. Fusce at turpis et justo vulputate fringilla a
                            sed est. Duis vulputate placerat fringilla. Ut dictum augue ut semper mattis. In congue,
                            dolor vel maximus condimentum, nunc dui dapibus risus, ac laoreet elit risus auctor velit.
                            Vestibulum luctus non libero non fringilla. Vivamus vel mauris tristique turpis egestas
                            consequat eu id diam. Nam mattis massa eu pharetra facilisis. Ut placerat maximus nisl.
                            Praesent eget lorem sit amet ligula dignissim suscipit non et velit. Vivamus sed malesuada
                            augue. Sed tempus dolor id mauris porttitor, vitae suscipit arcu consequat.

                            Proin tempor arcu quis est pulvinar, eget commodo nunc porttitor. Ut massa metus, ultrices
                            id commodo quis, scelerisque ut dui. Vestibulum porttitor libero tempor eros pharetra, ac
                            ornare ante blandit. Donec in lacus leo. Cras quis iaculis urna, sit amet posuere lectus.
                            Aenean tristique at felis ac blandit. Sed purus lectus, gravida in quam vel, efficitur
                            cursus elit.

                            Quisque tincidunt dictum sem, vel pretium felis mattis semper. Nulla quis eleifend risus.
                            Pellentesque dapibus quis orci sit amet commodo. Aenean finibus sed lectus id faucibus. Ut
                            id blandit felis. Etiam pulvinar orci nec gravida efficitur. Morbi sagittis consectetur dui
                            egestas tempus.

                            Pellentesque lorem eros, ornare ut orci eget, porta dignissim odio. Aliquam erat volutpat.
                            Cras eu tincidunt mauris, non egestas sapien. Ut mattis, sem non finibus congue, ex mi
                            vulputate dolor, at bibendum neque ante quis diam. In tincidunt interdum tortor non luctus.
                            Aliquam in viverra arcu. Etiam dictum rutrum magna, vitae sollicitudin justo convallis ac.
                            Nulla at felis commodo, rhoncus odio a, hendrerit justo. Quisque ut gravida risus. Nunc eget
                            tortor sapien. Praesent mauris felis, dictum in tincidunt sed, tempus in quam. Nulla in diam
                            sit amet sapien ornare venenatis. Vestibulum velit enim, egestas quis lorem ut, lacinia
                            iaculis leo. Nulla ultricies, tellus eu porta interdum, est metus laoreet turpis, vel
                            lacinia quam mi id massa.
                        </div>
                    </div>
                    <Link
                        to={`/manage/readOne/${this.props.collection._id}`}>
                        <RaisedButton
                            type="button"
                            label="Read more"
                        />
                    </Link>
                    <Link to={`/manage/readOne/${this.props.collection._id}/update`}>
                        <RaisedButton
                            type="button"
                            primary={true}
                            label="Update"
                        />
                    </Link>
                    <Link to={`/manage/readOne/${this.props.collection._id}/delete`}>
                        <RaisedButton
                            type="button"
                            secondary={true}
                            label="Delete"
                        />
                    </Link>
                </div>
            </div>
        );
    }
}

export default ViewRow