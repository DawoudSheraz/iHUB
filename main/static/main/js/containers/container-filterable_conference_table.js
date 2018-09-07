

const mapStateToProps = state => ({
  data: state.conference_reducer.conference_data,
  data_received: state.conference_reducer.conference_data_received
})


var FilterableConferenceTable_Connected =  window.ReactRedux.connect(mapStateToProps,null)(FilterableConferenceTable)
