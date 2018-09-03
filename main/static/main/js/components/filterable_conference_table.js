
// FilterableConferenceTable component which will
// filter/get the related conferences based on the search query
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


  handleTextChange(value){
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
//    console.log(this.state.search_text)
    return(

      <div >
        {/*  Custom search bar component */}
        <ControlledSearchBar onEditAction={this.handleTextChange}/>

        {/*  ConferenceList component, where data is passed by parent as prop*/}
        <ConferenceList conference_list = {this.props.conference_list} search_text={this.state.search_text}/>

        <Pagination base_url = {this.props.base_url} pagination_data = {this.props.pagination_data} NewRequestUrl={this.new_request_url}/>

        <p> AJAX Request URL : {this.state.req_url}</p>

      </div>
    )

  }

}
