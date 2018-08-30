
// This component renders actions that can be performed
// when there is no logged in user
// Will be used inside the header

function LogOutStateComponent(props){

    return(
      <ul className="nav navbar-nav navbar-right">
    <li><a href={props.login_url}>  <span className="glyphicon glyphicon-log-in"></span>  Login</a></li>

    </ul>
    )
}
