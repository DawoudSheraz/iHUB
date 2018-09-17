

const mapStateToProps = state => ({
  data: state.job_reducer.job_data,
  data_received: state.job_reducer.job_data_received,
  search_text: state.search_bar.search_text,
  start_date : state.start_date_picker.start_date,
  deadline: state.end_date_picker.end_date,
})

var FilterableJobTable_Connected =  window.ReactRedux.connect(mapStateToProps,null)(FilterableJobTable)
