

const mapStateToProps = state => ({
  data: state.job_reducer.job_data,
  data_received: state.job_reducer.job_data_received,
  search_text: state.search_bar.search_text,
})

var FilterableJobTable_Connected =  window.ReactRedux.connect(mapStateToProps,null)(FilterableJobTable)
