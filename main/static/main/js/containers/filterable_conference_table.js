
class FilterableConferenceTable extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      'search_text': '',
      'req_url': this.props.base_url,
    }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.new_request_url = this.new_request_url.bind(this)

  }

  // AJAX call to the API to get the data
  get_data_by_ajax_call(){
      request_conference_data(this.state.req_url, store.dispatch, store)
  }

// When component first mounts
  componentDidMount(){
  this.get_data_by_ajax_call()
  }

  // If component receives an update
  componentDidUpdate(prevProps, prevState){
    // If change in request url, get new data through that URL
    if(prevState.req_url !== this.state.req_url){
    this.get_data_by_ajax_call();
  }
  }

  handleTextChange(value){
//  console.log(window)
    this.setState({
      'search_text': value,
    })
  }

  new_request_url(value){
    this.setState({
      'req_url': value,
    })
  }

  render(){
  if(!this.props.data_received){

    return(
      <img src={this.props.load_img} style={{width:'25%', height:'25%',}}></img>
    )
  }
  else{
    // create pagination json from returned data
    let pagination_json = {
      'current_page': this.props.data['current_page']
      , 'next': this.props.data['next']
      , 'previous': this.props.data['previous']
      , 'pages': this.props.data['pages']
    }

  return (
      <div >
        <br/><br/>
      <ControlledSearchBar onEditAction={this.handleTextChange}/>

      <ConferenceList conference_list = {this.props.data['results']} search_text={this.state.search_text}/>

      <Pagination base_url = {this.props.base_url} pagination_data = {pagination_json} NewRequestUrl={this.new_request_url}/>

    </div>
    )
  }

  }

}

const mapStateToProps = state => ({
  data: state.conference_reducer.conference_data,
  data_received: state.conference_reducer.conference_data_received
})

var FilterableConferenceTable_Connected =  window.ReactRedux.connect(mapStateToProps,null)(FilterableConferenceTable)
