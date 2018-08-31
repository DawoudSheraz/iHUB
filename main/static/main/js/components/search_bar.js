
// Custom Search bar implemented keeping re-usability in mind
// The action will be provided by parent as a prop
class ControlledSearchBar extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      input : 'Search'
    }
    this.updateState = this.updateState.bind(this)
  }

  updateState(e){
    this.setState({
    'input': e.target.value
    }
    )
  }

  render(){

    return(
      <div >
      <input  type='input' placeholder='Search' onChange={this.updateState}></input>
      <p>
        {this.state.input}
      </p>
      </div>
    )

  }

}
