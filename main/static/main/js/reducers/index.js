 import paginated_conference_reducer from './reducer-update-conference-page.js'
 import search_bar_reducer from './reducer-search-bar.js'
 import paginated_job_reducer from './reducer-update-job-state.js'
 import paginated_scholarship_reducer from './reducer-update-scholarship-data.js'

// The main reducer containing all the other reducers
// will be passed to store
// created by window as index.js is imported as module
// and its global vars aren't accessible

 window.combinedReducerOut = window.Redux.combineReducers({
  conference_reducer :paginated_conference_reducer,
  search_bar: search_bar_reducer,
  job_reducer: paginated_job_reducer,
  scholarship_reducer: paginated_scholarship_reducer,
  })
