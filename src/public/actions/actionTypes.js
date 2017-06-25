// SignUp actions

// View
export const ON_USER_INFO_CHANGE = 'ON_USER_INFO_CHANGE';
export const ON_SAVE_USER_INITIATE = 'ON_SAVE_USER_INITIATE';
export const ON_SAVE_USER_SUCCESS = 'ON_SAVE_USER_SUCCESS';
export const ON_SAVE_USER_FAILURE = 'ON_SAVE_USER_FAILURE';

// Login actions

// View
export const ON_USER_INFO_CHANGE_LOGIN = 'ON_USER_INFO_CHANGE_LOGIN';
export const ON_LOGIN_INITIATE = 'ON_LOGIN_INITIATE';
export const ON_LOGIN_SUCCESS = 'ON_LOGIN_SUCCESS';
export const ON_LOGIN_FAILURE = 'ON_LOGIN_FAILURE';

// Credentials actions
export const GET_CREDENTIALS_INITIATED = 'GET_CREDENTIALS_INITIATED';
export const GET_CREDENTIALS_SUCCESS = 'GET_CREDENTIALS_SUCCESS';
export const GET_CREDENTIALS_FAILURE = 'GET_CREDENTIALS_FAILURE';

// Collections actions

// Search Actions - Universal Action
export const ON_SEARCH_QUERY_CHANGE = 'ON_SEARCH_QUERY_CHANGE';

// Search Actions - All Collections
export const ON_SEARCH_ALL_INITIATE = 'ON_SEARCH_ALL_INITIATE';
export const ON_SEARCH_ALL_SUCCESS = 'ON_SEARCH_ALL_SUCCESS';
export const ON_SEARCH_ALL_FAILURE = 'ON_SEARCH_ALL_FAILURE';
export const GET_ALL_COLLECTION_NAMES_INITIATE = 'GET_ALL_COLLECTION_NAMES_INITIATE';
export const GET_ALL_COLLECTION_NAMES_SUCCESS = 'GET_ALL_COLLECTION_NAMES_SUCCESS';
export const GET_ALL_COLLECTION_NAMES_FAILURE = 'GET_ALL_COLLECTION_NAMES_FAILURE';

// Should Update Actions
export const SET_SHOULD_UPDATE = 'SET_SHOULD_UPDATE';
export const REMOVE_SHOULD_UPDATE = 'REMOVE_SHOULD_UPDATE';

// HomeView Read All Collections
export const READ_COLLECTIONS_HOME_INITIATED = 'READ_COLLECTIONS_HOME_INITIATED';
export const READ_COLLECTIONS_HOME_SUCCESS = 'READ_COLLECTIONS_HOME_SUCCESS';
export const READ_COLLECTIONS_HOME_FAILURE = 'READ_COLLECTIONS_HOME_FAILURE';

// Manage Collections Create

// View
export const ON_CREATE_INITIATE = 'ON_CREATE_INITIATE';
export const ON_COLLECTION_NAME_CHANGE = 'ON_COLLECTION_NAME_CHANGE'; // Also for update
export const ON_COLLECTION_DESCRIPTION_CHANGE = 'ON_COLLECTION_DESCRIPTION_CHANGE'; // --/--
export const ON_PICTURES_ARRAY_CHANGE = 'ON_PICTURES_ARRAY_CHANGE'; // --/--
export const ON_ADD_INPUT_FIELDS = 'ON_ADD_INPUT_FIELDS'; // --/--
export const ON_REMOVE_INPUT_FIELDS = 'ON_REMOVE_INPUT_FIELDS'; // --/--
export const ON_SAVE_COLLECTION_INITIATE = 'ON_SAVE_COLLECTION_INITIATE';
export const ON_SAVE_COLLECTION_SUCCESS = 'ON_SAVE_COLLECTION_SUCCESS';
export const ON_SAVE_COLLECTION_FAILURE = 'ON_SAVE_COLLECTION_FAILURE';
// Component
export const ON_CREATE_COMPONENT_INITIATE = 'ON_CREATE_COMPONENT_INITIATE'; // Also for update
export const ON_SLIDE_INDEX_CHANGE = 'ON_SLIDE_INDEX_CHANGE'; // --/--

// Manage Collections Delete

// View
export const ON_DELETE_INITIATE = 'ON_DELETE_INITIATE';
export const ON_DELETE_INITIATE_SUCCESS = 'ON_DELETE_INITIATE_SUCCESS';
export const ON_DELETE_INITIATE_FAILURE = 'ON_DELETE_INITIATE_FAILURE';
export const ON_DELETE_EXECUTE_INITIATE = 'ON_DELETE_EXECUTE_INITIATE';
export const ON_DELETE_EXECUTE_SUCCESS = 'ON_DELETE_EXECUTE_SUCCESS';
export const ON_DELETE_EXECUTE_FAILURE = 'ON_DELETE_EXECUTE_FAILURE';

// Manage Collections ReadAll

// View
export const READ_ALL_COLLECTIONS_INTIATED = 'READ_ALL_COLLECTIONS_INTIATED';
export const READ_ALL_COLLECTIONS_SUCCESS = 'READ_ALL_COLLECTIONS_SUCCESS';
export const READ_ALL_COLLECTIONS_FAILURE = 'READ_ALL_COLLECTIONS_FAILURE';
export const ON_LOAD_MORE_INITIATE = 'ON_LOAD_MORE_INITIATE';
export const ON_LOAD_MORE_SUCCESS = 'ON_LOAD_MORE_SUCCESS';
export const ON_LOAD_MORE_FAILURE = 'ON_LOAD_MORE_FAILURE';
export const ITERATE_LOAD_AFTER = 'ITERATE_LOAD_AFTER';

// Manage Collections ReadOne

// View
export const READ_ONE_COLLECTION = 'READ_ONE_COLLECTION';
export const GET_COMMENTS_INITIATED = 'GET_COMMENTS_INITIATED';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE';
export const ON_LOAD_MORE_COMMENTS_INITIATE = 'ON_LOAD_MORE_COMMENTS_INITIATE';
export const ON_LOAD_MORE_COMMENTS_SUCCESS = 'ON_LOAD_MORE_COMMENTS_SUCCESS';
export const ON_LOAD_MORE_COMMENTS_FAILURE = 'ON_LOAD_MORE_COMMENTS_FAILURE';
export const ITERATE_COMMENTS_LOAD_AFTER = 'ITERATE_COMMENTS_LOAD_AFTER';
export const ON_CHANGE_COMMENT_INPUT = 'ON_CHANGE_COMMENT_INPUT';
export const ON_SAVE_COMMENT_INITIATE = 'ON_SAVE_COMMENT_INITIATE';
export const ON_SAVE_COMMENT_SUCCESS = 'ON_SAVE_COMMENT_SUCCESS';
export const ON_SAVE_COMMENT_FAILURE = 'ON_SAVE_COMMENT_FAILURE';
export const GET_COMMENTS_COUNT = 'GET_COMMENTS_COUNT';

// Manage collections Update

// View
export const ON_MOUNT_UPDATE_INITIATE = 'ON_MOUNT_UPDATE_INITIATE';
export const ON_MOUNT_UPDATE_SUCCESS = 'ON_MOUNT_UPDATE_SUCCESS';
export const ON_MOUNT_UPDATE_FAILURE = 'ON_MOUNT_UPDATE_FAILURE';
export const ON_UPDATE_COLLECTION_INITIATE = 'ON_UPDATE_COLLECTION_INITIATE';
export const ON_UPDATE_COLLECTION_SUCCESS = 'ON_UPDATE_COLLECTION_SUCCESS';
export const ON_UPDATE_COLLECTION_FAILURE = 'ON_UPDATE_COLLECTION_FAILURE';

// Browse Collections ReadAll

// View
export const READ_ALL_COLLECTIONS_BROWSE_INITIATED = 'READ_ALL_COLLECTIONS_BROWSE_INITIATED';
export const READ_ALL_COLLECTIONS_BROWSE_SUCCESS = 'READ_ALL_COLLECTIONS_BROWSE_SUCCESS';
export const READ_ALL_COLLECTIONS_BROWSE_FAILURE = 'READ_ALL_COLLECTIONS_BROWSE_SUCCESS';
export const ON_LOAD_MORE_BROWSE_INITIATE = 'ON_LOAD_MORE_BROWSE_INITIATE';
export const ON_LOAD_MORE_BROWSE_SUCCESS = 'ON_LOAD_MORE_BROWSE_SUCCESS';
export const ON_LOAD_MORE_BROWSE_FAILURE = 'ON_LOAD_MORE_BROWSE_FAILURE';
export const ITERATE_LOAD_AFTER_BROWSE = 'ITERATE_LOAD_AFTER_BROWSE';
