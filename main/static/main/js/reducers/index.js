 import paginated_conference_reducer from './reducer-update-conference-page.js'
 import search_bar_reducer from './reducer-search-bar.js'
 import paginated_job_reducer from './reducer-update-job-state.js'
 import paginated_scholarship_reducer from './reducer-update-scholarship-data.js'
 import start_date_reducer from './reducer-start-date.js'
 import end_date_reducer from './reducer-end-date.js'

// The main reducer containing all the other reducers
// will be passed to store
// created by window as index.js is imported as module
// and its global vars aren't accessible

 window.combinedReducerOut = window.Redux.combineReducers({
  conference_reducer :paginated_conference_reducer,
  search_bar: search_bar_reducer,
  start_date_picker:start_date_reducer,
  end_date_picker:end_date_reducer,
  job_reducer: paginated_job_reducer,
  scholarship_reducer: paginated_scholarship_reducer,
  form: ReduxForm.reducer,
  })
