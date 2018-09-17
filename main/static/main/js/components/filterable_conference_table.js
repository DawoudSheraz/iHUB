class FilterableConferenceTable extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      'req_url': this.props.base_url +'?page=1',
      'paper_deadline':''
    }
    this.new_request_url = this.new_request_url.bind(this)
    this.paper_deadline_date = this.paper_deadline_date.bind(this)

  }

  // AJAX call to the API to get the data
  get_data_by_ajax_call(){

    // Building up the params to be passed to the API url
    let ajax_query_param=''

    // If there is some search text, pass it via skills_list param
    if(this.props.search_text!=''){
    ajax_query_param+='&skills_list=' + this.props.search_text
    }

    if(this.state.paper_deadline!=''){
      ajax_query_param+='&paper_deadline_date=' + this.state.paper_deadline
    }

    request_conference_data(this.state.req_url + ajax_query_param, store.dispatch)
  }

// When component first mounts
  componentDidMount(){
  this.get_data_by_ajax_call()
  }

  // If component receives an update
  componentDidUpdate(prevProps, prevState){

    // If change in request url, get new data through that URL
    if(prevState.req_url !== this.state.req_url ||
      prevProps.search_text!== this.props.search_text
    || prevState.paper_deadline !==this.state.paper_deadline){
    this.get_data_by_ajax_call();
  }
  }


  new_request_url(value){
    this.setState({
      'req_url': value,
    })
  }

  paper_deadline_date(value){
    this.setState({
      paper_deadline:value
    })
  }

  render(){
  if(!this.props.data_received){

    return(
      <img src={this.props.load_img} style={{width:'25%', height:'25%',}} alt='Loading'></img>
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
        {/* <window.ContainerSearchBar/> */}
        <br/>
      <CustomDatePicker bubble_date={this.paper_deadline_date} date_description={'Call for Papers Deadline'}/>
      <ConferenceList conference_list = {this.props.data['results']} />

      <Pagination base_url = {this.props.base_url} pagination_data = {pagination_json} NewRequestUrl={this.new_request_url}/>

    </div>
    )
  }

  }

}

FilterableConferenceTable.defaultProps = {
  base_url : 'http://127.0.0.1:8000/main/api/conferences/'
}
