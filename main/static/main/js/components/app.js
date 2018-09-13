
class App extends React.Component{

  constructor(props){
    super(props);
  }

render(){

    const Switch = ReactRouterDOM.Switch
    const Route = ReactRouterDOM.Route
    const Link = ReactRouterDOM.Link

  return(
    <div>

      <PageSelectionNavbar />
      
      <br/><br/>
      <Switch>
          <Route exact path='/conferences' render={(props) => <ConferencePage {...props} app_data={this.props.app_data}/>}/>
          <Route exact path='/job_positions' render={(props) => <JobPage {...props} app_data={this.props.app_data}/>}/>
          <Route exact path='/scholarship' render={(props) => <ScholarshipPage {...props} app_data={this.props.app_data}/>}/>

          <ReactRouterDOM.Redirect from="/" to="/conferences" />
      </Switch>

    </div>
  )
}

}
