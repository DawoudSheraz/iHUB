
// Custom Search bar implemented keeping re-usability in mind
// The action will be provided by parent as a prop
class ControlledSearchBar extends React.Component{

  constructor(props){
    super(props);
    this.updateState = this.updateState.bind(this)
  }

  // Pass data to the parent, which is FilterableConferenceTable
  updateState(e){
    this.props.onEditAction(e.target.value)
  }

  render(){

    return(
      <div >
      <input  type='input' placeholder='Search' onChange={this.updateState}></input>
      </div>
    )

  }

}
