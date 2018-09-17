
// Custom Search bar implemented keeping re-usability in mind
class ControlledSearchBar extends React.Component{


  constructor(props){
    super(props);
    this.updateState = this.updateState.bind(this)
  }

  // Dispatch the new value to Store
  updateState(e){
    this.props.onEditAction(e.target.value)
  }

  render(){

    return(
      <div >
      <input  type='input' placeholder='Search on Skills' onChange={this.updateState} value={this.props.search_text}></input>
      </div>
    )

  }

}
