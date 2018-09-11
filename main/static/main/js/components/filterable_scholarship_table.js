
class FilterableScholarshipTable extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      'req_url': this.props.base_url,
    }
    this.new_request_url = this.new_request_url.bind(this)

  }

  // AJAX call to the API to get the data
  get_data_by_ajax_call(){
      request_scholarship_data(this.state.req_url, store.dispatch)
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

      <ScholarshipList scholarship_list = {this.props.data['results']} search_text={this.props.search_text}/>

      <Pagination base_url = {this.props.base_url} pagination_data = {pagination_json} NewRequestUrl={this.new_request_url}/>

    </div>
    )
  }

  }

}
