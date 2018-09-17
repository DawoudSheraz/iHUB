

const mapStateToProps = state => ({
  data: state.conference_reducer.conference_data,
  data_received: state.conference_reducer.conference_data_received,
  search_text: state.search_bar.search_text,
  start_date : state.start_date_picker.start_date,
  paper_deadline: state.end_date_picker.end_date,
})


var FilterableConferenceTable_Connected =  window.ReactRedux.connect(mapStateToProps,null)(FilterableConferenceTable)
