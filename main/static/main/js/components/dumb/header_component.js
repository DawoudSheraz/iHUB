
// Displays the top header, using LoginStateComponent and LogOutStateComponent

function HeaderComponent(props){

  let output_component = null
  const Route = ReactRouterDOM.Route
  const Link = ReactRouterDOM.Link
  const Switch = ReactRouterDOM.Switch

// Returns the header, with index/logo and corresponding component
return(
  <nav className="navbar navbar-inverse container-fluid">
      <div className="navbar-header">
          <Link className="navbar-brand" to='/'><strong>iHUB</strong></Link>
      </div>
      <ul className="nav navbar-nav navbar-right">
        <li><Link to='/suggestion'><strong>Suggestions</strong></Link></li>
      </ul>
  </nav>

)
};

HeaderComponent.defaultProps = {
  username : null,
}
