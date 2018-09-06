//define(function (require) {
//     ControlledSearchBar = require('../components/search_bar');
//     Pagination = require('../components/pagination_component');
//     ConferenceList = require('../components/conference_table');
//
//     console.log(ControlledSearchBar)
//});

//import ControlledSearchBar from '../components/search_bar'
//import Pagination from '../components/pagination_component'
//import ConferenceList from '../components/conference_table'
// FilterableConferenceTable component which will
// filter/get the related conferences based on the search query
// import {initial_state} from '../reducers/initial_state'
class FilterableConferenceTable extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      'search_text': '',
      'req_url': this.props.base_url,
      'data_received': false,
      'data': [],
    }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.new_request_url = this.new_request_url.bind(this)

  }

  // AJAX call to the API to get the data
  get_data_by_ajax_call(){
    $.ajax({
      'url': this.state.req_url,
      method:'GET',
      success: function(data){
        this.setState({
          'data_received': true,
          'data': data
        })
      }.bind(this)
      , error:function(error){
        console.log(error)
      }
    })
  }

// When component first mounts
  componentDidMount(){
      this.get_data_by_ajax_call();
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

  if(!this.state.data_received){

    return(
      <img src={this.props.load_img} style={{width:'25%', height:'25%',}}></img>
    )
  }
  else{
    // create pagination json from returned data
    let pagination_json = {
      'current_page': this.state.data['current_page']
      , 'next': this.state.data['next']
      , 'previous': this.state.data['previous']
      , 'pages': this.state.data['pages']
    }

  return (
      <div >
        <br/><br/>
      <ControlledSearchBar onEditAction={this.handleTextChange}/>

      <ConferenceList conference_list = {this.state.data['results']} search_text={this.state.search_text}/>

      <Pagination base_url = {this.props.base_url} pagination_data = {pagination_json} NewRequestUrl={this.new_request_url}/>

    </div>
    )
  }

  }

}
