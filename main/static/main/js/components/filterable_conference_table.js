
// FilterableConferenceTable component which will
// filter/get the related conferences based on the search query
class FilterableConferenceTable extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return(

      <div style = {{margin: '0 50%' }}>
        {/*  Custom search bar component */}
        <ControlledSearchBar />

        {/*  ConferenceList component, where data is passed by parent as prop*/}
        <ConferenceList conference_list = {this.props.conference_list}/>
      </div>
    )

  }

}
