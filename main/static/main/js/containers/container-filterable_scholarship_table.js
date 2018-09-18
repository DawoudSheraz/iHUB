
const mapStateToProps = (state) => ({

search_text : state.search_bar.search_text,
data: state.scholarship_reducer.scholarship_data,
data_received: state.scholarship_reducer.scholarship_data_received,
start_date : state.start_date_picker.start_date,
deadline: state.end_date_picker.end_date,
})

var FilterableScholarshipTable_Connected = ReactRedux.connect(mapStateToProps, null)(FilterableScholarshipTable)
