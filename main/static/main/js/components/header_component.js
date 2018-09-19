
// Displays the top header, using LoginStateComponent and LogOutStateComponent

function HeaderComponent(props){

  let output_component = null
  const Route = ReactRouterDOM.Route
  const Link = ReactRouterDOM.Link
  const Switch = ReactRouterDOM.Switch

// Returns the header, with index/logo and corresponding component
return(
<div>
  <div>
  <nav className="navbar navbar-default">
      <div className="navbar-header">
          <Link className="navbar-brand" to='/'><strong>iHUB</strong></Link>
      </div>
      <ul className="nav navbar-nav navbar-right">
        <li><Link to='/suggestion'><strong>Suggestions</strong></Link></li>
      </ul>
  </nav>
</div>

</div>
)
};

HeaderComponent.defaultProps = {
  username : null,
}
