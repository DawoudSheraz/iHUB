
class PageSelectionNavbar extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
      const NavLink = ReactRouterDOM.NavLink
      return(
        <div className='container-fluid'>
          <div className='row'>

            <NavLink className='btn btn-link col-md-4 col-xs-12' to='/conferences'  activeClassName='active'>
              Conferences
            </NavLink>
            <NavLink className='btn btn-link col-md-4 col-xs-12' to='/job_positions'  activeClassName='active'>
              Job Positions
            </NavLink>
            <NavLink className='btn btn-link col-md-4 col-xs-12' to='/scholarship'  activeClassName='active'>
              Scholarships
            </NavLink>

        </div>
        </div>
      )
  }
}
