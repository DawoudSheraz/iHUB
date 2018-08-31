
// FilterableConferenceTable component which will
// filter/get the related conferences based on the search query
class FilterableConferenceTable extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      'search_text': ''
    }
    this.handleTextChange = this.handleTextChange.bind(this)
  }


  handleTextChange(value){
    this.setState({
      'search_text': value,
    })
  }

  render(){
//    console.log(this.state.search_text)
    return(

      <div style = {{margin: '0 40%' }}>
        {/*  Custom search bar component */}
        <ControlledSearchBar onEditAction={this.handleTextChange}/>

        {/*  ConferenceList component, where data is passed by parent as prop*/}
        <ConferenceList conference_list = {this.props.conference_list} search_text={this.state.search_text}/>
      </div>
    )

  }

}
