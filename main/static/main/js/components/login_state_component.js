
// Component to show actions available on the header
// when user is logged in
function LoginStateComponent(props){
return (
  <div>
    {/* <li> <a href="{% url 'main:add_scholarship'%}" className="bg-warning"> + Scholarship </a></li>
    <li> <a href="{% url 'main:add_conference'%}" className="bg-danger"> + Conference </a></li> */}
    <li> <a href={props.data_json['edit_url']} className="bg-info">{props.username} </a></li>
    <li><a href={props.data_json['logout_url']}>  <span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
  </div>
)
}

LoginStateComponent.defaultProps = {
    username: null,
}
