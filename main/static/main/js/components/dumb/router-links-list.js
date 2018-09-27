
class PageSelectionNavbar extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
      const NavLink = ReactRouterDOM.NavLink
      return(
        <div className='container'>
          <div className='row'>

            <NavLink onClick = {this.props.hide_navbar} className='btn btn-link col-md-4 col-xs-12' to='/conferences'  activeClassName='active'>
              Conferences
            </NavLink>
            <NavLink onClick = {this.props.hide_navbar} className='btn btn-link col-md-4 col-xs-12' to='/job_positions'  activeClassName='active'>
              Job Positions
            </NavLink>
            <NavLink onClick = {this.props.hide_navbar} className='btn btn-link col-md-4 col-xs-12' to='/scholarship'  activeClassName='active'>
              Scholarships
            </NavLink>

        </div>
        </div>
      )
  }
}

PageSelectionNavbar.defaultProps = {
  hide_navbar : () => null
}
