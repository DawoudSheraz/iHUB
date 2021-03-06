class FilterableConferenceTable extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      'req_url': this.props.base_url +'?page=1',
    }
    this.new_request_url = this.new_request_url.bind(this)
  }

  // AJAX call to the API to get the data
  get_data_by_ajax_call(){

    // Building up the params to be passed to the API url
    let ajax_query_param=''

    // If there is some search text, pass it via skills_list param
    if(this.props.search_text!=''){
    ajax_query_param+='&skills_list=' + this.props.search_text
    }

    if(this.props.paper_deadline!=''){
      ajax_query_param+='&paper_deadline_date=' + this.props.paper_deadline.format('YYYY-MM')
    }

    if(this.props.start_date!=''){
      ajax_query_param+='&start_date=' + this.props.start_date.format('YYYY-MM')
    }

    if(this.props.country_search_text!=''){
      ajax_query_param+='&country=' + this.props.country_search_text
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
    || prevProps.paper_deadline !==this.props.paper_deadline
  || prevProps.start_date !== this.props.start_date
|| prevProps.country_search_text != this.props.country_search_text){
    this.get_data_by_ajax_call();
  }
  }


  new_request_url(value){
    this.setState({
      'req_url': value,
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
        <br/>

      <ConferenceList conference_list = {this.props.data['results']} />
      <Pagination base_url = {this.props.base_url} pagination_data = {pagination_json} NewRequestUrl={this.new_request_url}/>

    </div>
    )
  }

  }

}

FilterableConferenceTable.defaultProps = {
  base_url : 'http://0.0.0.0:8000/main/api/conferences/'
  , load_img:''
}
