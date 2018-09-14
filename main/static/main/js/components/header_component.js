
// Displays the top header, using LoginStateComponent and LogOutStateComponent

function HeaderComponent(props){

  let output_component = null
  const Route = ReactRouterDOM.Route
  const Link = ReactRouterDOM.Link

  // // If there is logged in user, use LoginStateComponent
  // if(props.username){
  //
  //   // Only passing the attributes that LoginStateComponent requires
  //   let login_state_json = {
  //     'edit_url': props.data_json['edit_url']
  //     , 'logout_url': props.data_json['logout_url']
  //   }
  //
  //   output_component = <LoginStateComponent username={props.username} data_json={login_state_json}/>
  // }
  // // For LogOutStateComponent component
  // else{
  //   output_component = <LogOutStateComponent login_url = {props.data_json['login_url']}/>
  // }

// Returns the header, with index/logo and corresponding component
return(

  <div>
  <nav className="navbar navbar-default">
      <div className="navbar-header">
          <Link className="navbar-brand" to='/'><strong>iHUB</strong></Link>
      </div>
  </nav>

  <Route exact path='/' component={AppBody}/>
</div>
)
};

HeaderComponent.defaultProps = {
  username : null,
}
