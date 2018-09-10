
const mapStateToProps = (state) => ({

search_text : state.search_bar.search_text,
data: state.scholarship_reducer.scholarship_data,
data_received: state.scholarship_reducer.scholarship_data_received
})

var FilterableScholarshipTable_Connected = ReactRedux.connect(mapStateToProps, null)(FilterableScholarshipTable)
