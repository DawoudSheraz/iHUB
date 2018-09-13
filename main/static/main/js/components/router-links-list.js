
class PageSelectionNavbar extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
      const NavLink = ReactRouterDOM.NavLink

      return(

        <ul className="nav navbar-nav navbar-left">
            <li ><NavLink to='/conferences'  activeStyle={{'color':'red'}}>Conferences</NavLink></li>
            <li ><NavLink to='/job_positions'  activeStyle={{'color':'red'}}>Job Positions</NavLink></li>
            <li ><NavLink to='/scholarship'  activeStyle={{'color':'red'}}>Scholarships</NavLink></li>
        </ul>
      )
  }
}
