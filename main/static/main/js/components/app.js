
class App extends React.Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    // Request skills, which will be saved in the store
    // Called here as data will be retrieved only once
    request_skills(this.props.skills_api_url, store.dispatch)
  }

  render(){
  const Route = ReactRouterDOM.Route
  const Link = ReactRouterDOM.Link

  return(

    <div>
        <HeaderComponent />
        <Route exact path='/' render={(old_props) => <AppBody {...old_props} app_data={this.props.app_data}  />}/>
        <Route exact path='/suggestion' component={ConnectedSuggestionForm}/>
        <Route exact path='/conferences' render={(old_props) => <ConferencePage app_data={this.props.app_data} {...old_props} />}/>
        <Route exact path='/job_positions' render={(old_props) => <JobPage {...old_props} app_data={this.props.app_data}/>}/>
        <Route exact path='/scholarship' render={(old_props) => <ScholarshipPage {...old_props} app_data={this.props.app_data}/>}/>
        <ReactRouterDOM.Redirect to='/' from='/main' />

    </div>
  )
}
}


App.defaultProps =  {
  skills_api_url : 'http://172.16.12.15:8000/main/api/skills/'
}
