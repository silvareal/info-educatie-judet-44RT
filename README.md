<h1><i>4Art</i></h1>

<p>Version 0.0.3 of the project.</p>

<h1><i>System requirements</i></h1>

<ul>
<li>Terminal (Ubuntu's Command Line or Windows equivalent)</li>
<li>NodeJS v7.8.0 (minimum)</li>
<li>npm (minimum 4.2.0)</li>
<li>Browser that uses JavaScript</li>
<li>Browser that supports LocalStorage (Chrome, Firefox etc)</li>
<li>MongoDB installed (for development we used port 27017)</li>
</ul>

<p>To check for a current installed version of NodeJS or npm, run the following commands:</p>

```shell
node -v
npm -v
```

<p>The website was developed on Chrome and tested on Chrome and Firefox.</p>
<p>Project is not distributed with a database</p>

<h1><i>File structure</i></h1>
<pre>
/info-educatie-judet-44RT-master/
| -- config
|    | -- index.json       
| -- resource 
|    | -- authentication
|    |    | -- login.js
|    |    | -- signup.js
|    | -- index 
|    |    | -- images 
|    |    |    | -- img1.jpg
|    |    |    | -- img2.jpg
|    |    |    | -- img3.jpg
|    |    |    | -- img4.jpg
|    |    |    | -- img5.jpg
|    |    |    | -- img6.jpg
|    |    |    | -- img7.jpg
|    |    |    | -- img8.jpg
|    |    |    | -- img9.jpg
|    |    | -- favicon.ico
|    |    | -- index.html
|    |    | -- main.scss
|    |    | -- main.css
|    |    | -- main.css.map
|    | -- middleware
|    |    | -- authentication-check.js
|    | -- mongo-models
|    |    | -- authentication
|    |    |    | -- user.js
|    |    | -- collections
|    |    |    | -- collection.js
|    |    |    | -- commentCollection.js
|    |    | -- contact
|    |    |    | -- contact.js
|    |    | -- logs-models
|    |    |    | -- authentication-logs
|    |    |    |    | -- loginLogs.js
|    |    |    |    | -- signupLogs.js
|    |    |    | -- collections-logs  
|    |    |    |    | -- createCollectionLogs.js
|    |    |    |    | -- deleteCollectionLogs.js
|    |    |    |    | -- updateCollectionLogs.js
|    |    |    | -- news-logs
|    |    |    |    | -- createNewsLogs.js
|    |    |    |    | -- deleteNewsLogs.js
|    |    |    |    | -- updateNewsLogs.js
|    |    |    | -- profile-logs
|    |    |    |    | -- updateProfileLogs.js
|    |    | -- news
|    |    |    | -- commentNews.js
|    |    |    | -- news.js
|    |    | -- index.js
|    | -- routes
|    |    | -- admin.js
|    |    | -- authentication.js
|    |    | -- browse.js
|    |    | -- comment.js
|    |    | -- crud.js
|    |    | -- home.js
|    |    | -- profile.js
|    |    | -- socket.js
| -- src
|    | -- build
|    |    | -- index.js
|    | -- public
|    |    | -- components
|    |    |    | -- Admin
|    |    |    |    | -- Collections
|    |    |    |    |    | -- Main Components
|    |    |    |    |    |    | -- Create.jsx
|    |    |    |    |    |    | -- Delete.jsx
|    |    |    |    |    |    | -- ReadAll.jsx
|    |    |    |    |    |    | -- ReadOne.jsx
|    |    |    |    |    |    | -- Update.jsx
|    |    |    |    |    | -- Partials Components
|    |    |    |    |    |    | -- Comment.jsx
|    |    |    |    |    |    | -- CommentForm.jsx
|    |    |    |    |    |    | -- CommentList.jsx
|    |    |    |    |    |    | -- PictureRow.jsx
|    |    |    |    |    |    | -- TopActions.jsx
|    |    |    |    |    |    | -- ViewRow.jsx
|    |    |    |    |    |    | -- ViewTable.jsx
|    |    |    |    | -- Logs
|    |    |    |    |    | -- Collections
|    |    |    |    |    |    | -- LogsCollections.jsx
|    |    |    |    |    |    | -- LogsCollectionsCreate.jsx
|    |    |    |    |    |    | -- LogsCollections.Delete.jsx
|    |    |    |    |    |    | -- LogsCollectionsUpdate.jsx
|    |    |    |    |    | -- Login
|    |    |    |    |    |    | -- LogsLogin.jsx
|    |    |    |    |    | -- Main Component
|    |    |    |    |    |    | -- Logs.jsx
|    |    |    |    |    | -- News
|    |    |    |    |    |    | -- LogsNews.jsx
|    |    |    |    |    |    | -- LogsNewsCreate.jsx
|    |    |    |    |    |    | -- LogsNewsDelete.jsx
|    |    |    |    |    |    | -- LogsNewsUpdate.jsx
|    |    |    |    |    | -- Profile
|    |    |    |    |    |    | -- LogsProfile.jsx
|    |    |    |    |    | -- Signup
|    |    |    |    |    |    | -- LogsSignup.jsx
|    |    |    |    | -- Main Component
|    |    |    |    |    | -- Admin.jsx
|    |    |    |    | -- News
|    |    |    |    |    | -- Main Components
|    |    |    |    |    |    | -- Create.jsx
|    |    |    |    |    |    | -- Delete.jsx
|    |    |    |    |    |    | -- ReadAll.jsx
|    |    |    |    |    |    | -- ReadOne.jsx
|    |    |    |    |    |    | -- Update.jsx
|    |    |    |    |    | -- Partials Components
|    |    |    |    |    |    | -- Comment.jsx
|    |    |    |    |    |    | -- CommentForm.jsx
|    |    |    |    |    |    | -- CommentList.jsx
|    |    |    |    |    |    | -- PictureRow.jsx
|    |    |    |    |    |    | -- TopActions.jsx
|    |    |    |    |    |    | -- ViewRow.jsx
|    |    |    |    |    |    | -- ViewTable.jsx
|    |    |    |    | -- Users
|    |    |    |    |    | -- Main Components
|    |    |    |    |    |    | -- Users.jsx
|    |    |    |    |    | -- Partials Components
|    |    |    |    |    |    | -- UsersRowsMobile.jsx
|    |    |    | -- Authentication
|    |    |    |    | -- Login.jsx
|    |    |    |    | -- SignUp.jsx
|    |    |    | -- BrowseCollections
|    |    |    |    | -- Main Components
|    |    |    |    |    | -- ReadAll.jsx
|    |    |    |    |    | -- ReadOne.jsx
|    |    |    |    | -- Partials Components
|    |    |    |    |    | -- Comment.jsx
|    |    |    |    |    | -- CommentForm.jsx
|    |    |    |    |    | -- CommentList.jsx
|    |    |    |    |    | -- PictureRow.jsx
|    |    |    |    |    | -- TopActions.jsx
|    |    |    |    |    | -- ViewRow.jsx
|    |    |    |    |    | -- ViewTable.jsx
|    |    |    | -- BrowseNews
|    |    |    |    | -- Main Components
|    |    |    |    |    | -- ReadAll.jsx
|    |    |    |    |    | -- ReadOne.jsx
|    |    |    |    | -- Partials Components
|    |    |    |    |    | -- Comment.jsx
|    |    |    |    |    | -- CommentForm.jsx
|    |    |    |    |    | -- CommentList.jsx
|    |    |    |    |    | -- PictureRow.jsx
|    |    |    |    |    | -- TopActions.jsx
|    |    |    |    |    | -- ViewRow.jsx
|    |    |    |    |    | -- ViewTable.jsx
|    |    |    | -- Collections
|    |    |    |    | -- Main Components
|    |    |    |    |    | -- Create.jsx
|    |    |    |    |    | -- Delete.jsx
|    |    |    |    |    | -- ReadAll.jsx
|    |    |    |    |    | -- ReadOne.jsx
|    |    |    |    |    | -- Update.jsx
|    |    |    |    | -- Partials Components
|    |    |    |    |    | -- Comment.jsx
|    |    |    |    |    | -- CommentForm.jsx
|    |    |    |    |    | -- CommentList.jsx
|    |    |    |    |    | -- PictureRow.jsx
|    |    |    |    |    | -- TopActions.jsx
|    |    |    |    |    | -- ViewRow.jsx
|    |    |    |    |    | -- ViewTable.jsx
|    |    |    | -- Contact
|    |    |    |    | -- Contact.jsx
|    |    |    | -- Home
|    |    |    |    | -- Main Components
|    |    |    |    |    | -- Home.jsx
|    |    |    |    |    | -- ReadOne.jsx
|    |    |    |    | -- Partials Components
|    |    |    |    |    | -- Comment.jsx
|    |    |    |    |    | -- CommentForm.jsx
|    |    |    |    |    | -- CommentList.jsx
|    |    |    |    |    | -- PictureRow.jsx
|    |    |    | -- Loading Indicator
|    |    |    |    | -- LoadingIndicator.jsx
|    |    |    | -- MainApp Partials
|    |    |    |    | -- AppBar.jsx
|    |    |    | -- Profile
|    |    |    |    | -- Profile.jsx
|    |    | -- constants
|    |    |    | -- errors.js
|    |    | -- containers
|    |    |    | -- Admin
|    |    |    |    | -- Collections
|    |    |    |    |    | -- CreateView.jsx
|    |    |    |    |    | -- DeleteView.jsx
|    |    |    |    |    | -- ReadAllView.jsx
|    |    |    |    |    | -- ReadOneView.jsx
|    |    |    |    |    | -- UpdateView.jsx
|    |    |    |    | -- Logs
|    |    |    |    |    | -- Collections
|    |    |    |    |    |    | -- LogsCollectionsCreateView.jsx
|    |    |    |    |    |    | -- LogsCollectionsDeleteView.jsx
|    |    |    |    |    |    | -- LogsCollectionsUpdateView.jsx
|    |    |    |    |    |    | -- LogsCollectionsView.jsx
|    |    |    |    |    | -- Login
|    |    |    |    |    |    | -- LogsLoginView.jsx
|    |    |    |    |    | -- Main Component
|    |    |    |    |    |    | -- LogsView.jsx
|    |    |    |    |    | -- News
|    |    |    |    |    |    | -- LogsNewsCreateView.jsx
|    |    |    |    |    |    | -- LogsNewsDeleteView.jsx
|    |    |    |    |    |    | -- LogsNewsUpdateView.jsx
|    |    |    |    |    |    | -- LogsNewsView.jsx
|    |    |    |    |    | -- Profile
|    |    |    |    |    |    | -- LogsProfileView.jsx
|    |    |    |    |    | -- Signup
|    |    |    |    |    |    | -- LogsSignupView.jsx
|    |    |    |    | -- Main Component
|    |    |    |    |    |  -- AdminView.jsx
|    |    |    |    | -- News
|    |    |    |    |    | -- CreateView.jsx
|    |    |    |    |    | -- DeleteView.jsx
|    |    |    |    |    | -- ReadAllView.jsx
|    |    |    |    |    | -- ReadOneView.jsx
|    |    |    |    |    | -- UpdateView.jsx
|    |    |    |    | -- Users
|    |    |    |    |    | -- UsersView.jsx
|    |    |    | -- Authentication
|    |    |    |    | -- LoginView.jsx
|    |    |    |    | -- SignUpView.jsx
|    |    |    | -- BrowseCollections
|    |    |    |    | -- ReadAllView.jsx
|    |    |    |    | -- ReadOneView.jsx
|    |    |    | -- BrowseNews
|    |    |    |    | -- ReadAllView.jsx
|    |    |    |    | -- ReadOneView.jsx
|    |    |    | -- Collections
|    |    |    |    | -- CreateView.jsx
|    |    |    |    | -- DeleteView.jsx
|    |    |    |    | -- ReadAllView.jsx
|    |    |    |    | -- ReadOneView.jsx
|    |    |    |    | -- UpdateView.jsx
|    |    |    | -- Contact
|    |    |    |    | -- ContactView.jsx
|    |    |    | -- Error
|    |    |    |    | -- NotAuthorizedView.jsx
|    |    |    |    | -- NotFoundView.jsx
|    |    |    | -- Home
|    |    |    |    | -- HomeView.jsx
|    |    |    | -- MainApp
|    |    |    |    | -- MainApp.jsx
|    |    |    | -- Profile
|    |    |    |    | -- ProfileView.jsx
|    |    | -- modules
|    |    |    | -- Auth.js
|    |    | -- style
|    |    |    | -- constants
|    |    |    |    | -- _fonts.scss
|    |    |    |    | -- _functions.scss
|    |    |    | -- partials
|    |    |    |    | -- _appBar.scss
|    |    |    | -- _adminCP.scss
|    |    |    | -- _collections.scss
|    |    |    | -- _contact.scss
|    |    |    | -- _home.scss
|    |    |    | -- _login.scss
|    |    |    | -- _logs.scss
|    |    |    | -- _manage-users.scss
|    |    |    | -- _news.scss
|    |    |    | -- _profile.scss
|    |    |    | -- _signup.scss
|    |    |    | -- _universal.scss
|    |    | -- app.jsx
|    |    | -- routes.js
| -- .babelrc
| -- .eslintrc.json
| -- .gitignore
| -- index.js
| -- package.json
| -- README.md
| -- webpack.config.js
</pre>

<h1><i>Installation</i></h1>

<p>Once you meet the above requirements, go to the folder called /info-educatie-judet-44RT-master/ and follow these steps:</p>

<ol>
<li>Open a terminal</li>
<li>Run the following command:</li>

```shell
npm install
```

<li>Configure MongoDB in /config/index.json (we distribute the project with no password for the database)</li>
<li>Go back to the root folder and run the command: </li>

```shell
npm start
```

OPTIONAL: If that fails, just run this command instead: 

```shell
node index.js
```

<li>Navigate to localhost:8080 or your reverse proxy equivalent in your browser.</li>
<li>The site should be up and running at this point.</li>

<p>Again, the webiste is not distributed with a database. In the next section we will explain why.</p>
</ol>

<h1><i>Usage</i></h1>

<h3><i>1.Database</i></h3>

<p>MongoDB is a NoSQL database that allows us to have extensive, quickly fixable and easy to setup schemas.</p>
<p>To use the website you don't need to bother to import our data, you can easily create yours. Here is how: simply navigate to localhost:8080 and use the website</p>

<p>MongoDB can use, or not, defined schemas just like SQL databases. Our application has some defined schemas that you don't need to worry about.</p>

<p>As soon as you finished the steps in the above section, you can register, login, create collections(our use of the term collections, not MondoDB's) , delete them etc</p>

<p>To become an admin, you need to have create an account and manually modify the field in the collection called users (MongoDB's term of collections) called admin and set it to true. </p>

<p>For the above operation, we strongly recommend MondoDB Compass.</p>

<h3><i>2.Using the website as a guest</i></h3>

<p>You can:</p>

<ol>
<li>Register&Login</li>
<li>See the main page without the ability to comment</li>
<li>Browse all news articles</li>
<li>Browse all collections</li>
</ol>

<h3><i>3.Using the website as a regular user</i></h3>

<p>You can:</p>

<ol>
<li>See the main page</li>
<li>Browse all news articles</li>
<li>Browse all collections</li>
<li>Comment on any article or collection</li>
<li>You have your own profile and identity on the website</li>
<li>Post new collections of yourself and manage them as you want (edit, delete)</li>
</ol>

<h3><i>4.Using the website as an admin</i></h3>

<p>You can:</p>

<ol>
<li>See the main page</li>
<li>Browse all news articles</li>
<li>Browse all collections</li>
<li>Comment on any article or collection</li>
<li>You have your own profile and identity on the website</li>
<li>Post new collections of yourself and manage them as you want (edit, delete)</li>
<li>Post news articles and manage them as you want (edit, delete)</li>
<li>Edit all collections on the website, including who owns them</li>
<li>Delete all collections on the website</li>
<li>Create collections for other users in case they deleted it by mistake</li>
<li>Have access to all the logs of the website (these include all CUD (create, update, delete) actions performed by anybody on both news and collections. The logs also include all login logs, signup logs and profile edit logs.</li>
<li>Give users moderator rights or ban them from the website.</li>
<p>Important note: Moderators are not yet implemented. Users can be set to moderators but they can perform the same actions regular users can.</p>
</ol>

<h1><i>Technical details</i></h1>

TO BE CONTINUED