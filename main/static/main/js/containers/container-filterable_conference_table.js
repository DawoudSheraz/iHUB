

const mapStateToProps = state => ({
  data: state.conference_reducer.conference_data,
  data_received: state.conference_reducer.conference_data_received,
  search_text: state.search_bar.search_text,
})


var FilterableConferenceTable_Connected =  window.ReactRedux.connect(mapStateToProps,null)(FilterableConferenceTable)
