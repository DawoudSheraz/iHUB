
// Custom Search bar implemented keeping re-usability in mind
class ControlledSearchBar extends React.Component{


  constructor(props){
    super(props);

    this.updateState = this.updateState.bind(this)
    this.searchRef = React.createRef()
  }

  componentDidMount(){
    const current = this.searchRef.current

    // Convert input to TokenField component
    $(current).tokenfield({
      autocomplete: {
      source: ['python', 'django', 'music'],
      delay: 100
      }
  })

  // add onChange event listener via jQuery
  $(current).change(function(){
    this.props.onEditAction(current.value)
  }.bind(this))

  // Checking for duplicate tokens
  $(current).on('tokenfield:createtoken', function (event) {
    var existingTokens = $(this).tokenfield('getTokens');
    $.each(existingTokens, function(index, token) {
        if (token.value === event.attrs.value)
            event.preventDefault();
    });
});
  }

  // Dispatch the new value to Store
  updateState(e){
    this.props.onEditAction(e.target.value)
  }

  render(){

    return(
      <div >
      <input  type='input' placeholder='Search on Skills'
        onChange={this.updateState}
        value={this.props.search_text}
        ref={this.searchRef}></input>
      </div>
    )

  }

}
