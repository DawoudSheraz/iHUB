
class AppBody extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      'on_main_page': true
    }
    this.update_state_on_click = this.update_state_on_click.bind(this)
  }

  componentDidMount(){
    this.setState({
      on_main_page:true
    })
  }

  componentDidUpdate(prevProps, prevState){

    if(prevState.on_main_page == this.state.on_main_page){
      return false
    }
  }

  update_state_on_click(){
    this.setState({
      'on_main_page': false
    })
  }



render(){
    const Switch = ReactRouterDOM.Switch
    const Route = ReactRouterDOM.Route
  return(
    <div>
      {/*  Page selection*/}
      {this.state.on_main_page ? <PageSelectionNavbar hide_navbar = {this.update_state_on_click}/> : null}

    </div>
  )
}

}
