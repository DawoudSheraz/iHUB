
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
      <div style = {{margin: '0 50%' }}>
      <input  type='input' placeholder='Search' onChange={this.updateState}></input>
      <p>
        {this.state.input}
      </p>
      </div>
    )

  }

}
