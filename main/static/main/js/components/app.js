
function App(props){
  const Route = ReactRouterDOM.Route
  const Link = ReactRouterDOM.Link
  const Switch = ReactRouterDOM.Switch
  return(
    <div>
      <HeaderComponent />

      <div>
        {/* <AppBody app_data = {props.app_data}/> */}

      <Switch>
        <Route exact path='/' render={(old_props) => <AppBody {...old_props} app_data={props.app_data}  />}/>
        <Route  path='/suggestion' component={ConnectedSuggestionForm}/>
        <Route  path='/conferences' render={(old_props) => <ConferencePage app_data={props.app_data} {...old_props} />}/>
        <Route  path='/job_positions' render={(old_props) => <JobPage {...old_props} app_data={props.app_data}/>}/>
        <Route  path='/scholarship' render={(old_props) => <ScholarshipPage {...old_props} app_data={props.app_data}/>}/>
        <ReactRouterDOM.Redirect to='/' from='/main' />
      </Switch>
      </div>

    </div>
  )
}
