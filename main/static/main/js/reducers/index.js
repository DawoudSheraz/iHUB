 import paginated_reducer, {paginated_conference_reducer} from './reducer-update-conference-page.js'

// paginated_conference_reducer = require('paginated_conference_reducer')

// define(['paginated_conference_reducer'], function(paginated_conference_reducer) {
//   console.log(paginated_conference_reducer);
//
// });
// The main reducer containing all the other reducers
// will be passed to store
(paginated_reducer())
console.log(paginated_conference_reducer)
// var combinedReducerOut = window.Redux.combineReducers({
//   paginated_conference_reducer
//
//   })
