
class InternallyControlledSearchBar extends React.Component{

  constructor(props){
    super(props);
    this.update_State = this.update_State.bind(this)
  }

  // Send the update text value to the Parent
  update_State(e){
    this.props.onEditAction(e.target.value)
  }

  render(){
    return(

      <input
        type='text'
        placeholder={this.props.placeholder_text}
        onChange={this.update_State}
        value={this.props.text_val}
        >
        </input>

    )
  }
}

InternallyControlledSearchBar.defaultProps = {
  placeholder_text : 'Search...'
}
