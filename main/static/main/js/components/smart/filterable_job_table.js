class FilterableJobTable extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      'req_url': this.props.base_url + '?page=1',
      'experience_required':''
    }
    this.new_request_url = this.new_request_url.bind(this)
    this.experience_req = this.experience_req.bind(this)

  }

  // AJAX call to the API to get the data
  get_data_by_ajax_call(){

    // Building up the params to be passed to the API url
    let ajax_query_param=''

    // If there is some search text, pass it via skills_list param
    if(this.props.search_text!=''){
    ajax_query_param+='&skills_list=' + this.props.search_text
    }

    if(this.props.deadline!=''){
      ajax_query_param+='&deadline_date=' + this.props.deadline.format('YYYY-MM')
    }

    if(this.props.start_date!=''){
      ajax_query_param+='&start_date=' + this.props.start_date.format('YYYY-MM')
    }
    if(this.state.experience_required!=''){
      ajax_query_param+='&experience=' + this.state.experience_required
    }

    request_job_data(this.state.req_url + ajax_query_param, store.dispatch)
  }

// When component first mounts
  componentDidMount(){
  this.get_data_by_ajax_call()
  }

  // If component receives an update
  componentDidUpdate(prevProps, prevState){

    // If change in request url or search box text, get new data through that URL
    if(prevState.req_url !== this.state.req_url ||
      prevProps.search_text!== this.props.search_text
      || prevProps.deadline !==this.props.deadline
    || prevProps.start_date !== this.props.start_date
  || prevState.experience_required != this.state.experience_required){
    this.get_data_by_ajax_call();
  }
  }


experience_req(e){
  this.setState({
    experience_required: e.target.value
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
        <div>
          <select onChange={this.experience_req} value={this.state.experience_required}>
            <option value=''>-- Select Experience Required --</option>
            <option value='0-1 Years'>{'0-1 Years'}</option>
            <option value='2-3 Years'>{'2-3 Years'}</option>
            <option value='4-5 Years'>{'4-5 Years'}</option>
            <option value='5+ Years'>{'5+ Years'}</option>
          </select>
        </div>
      <JobList job_list = {this.props.data['results']} />

      <Pagination base_url = {this.props.base_url} pagination_data = {pagination_json} NewRequestUrl={this.new_request_url}/>

    </div>
    )
  }

  }

}

FilterableJobTable.defaultProps = {
  base_url: 'http://0.0.0.0:8000/main/api/student_positions/',
}
