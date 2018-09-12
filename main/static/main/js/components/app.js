
class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      'current': 'Conference'
    }
    this.updateOnClick = this.updateOnClick.bind(this)
  }

  // On clicking a button on the navbar, update the currently
  // selected button state
  updateOnClick(value){
    this.setState({
      current: value
    })
  }

  // Select the underlying component based on currently selected button
  return_currently_selected(){
    if(this.state.current == 'Conference'){
    return (
          <FilterableConferenceTable_Connected
            base_url={this.props.app_data['conf_base_url']}
            load_img={this.props.app_data['load_img']}
               />
      )
    }
    else if(this.state.current == 'Job'){
      return (
          <FilterableJobTable_Connected
          base_url={this.props.app_data['job_base_url']}
          load_img={this.props.app_data['load_img']}/>
      )
    }
    else if(this.state.current == 'Scholarship'){
      return (
          <FilterableScholarshipTable_Connected
          base_url={this.props.app_data['sch_base_url']}
          load_img={this.props.app_data['load_img']}/>
      )
    }
  }

render(){
    let out_content = this.return_currently_selected()

  return(
    <div>
      <div>
        <FeatureNavBar current={this.state.current} updateOnClick={this.updateOnClick}/>
      </div>
      <div className='text-center'>
        <window.ContainerSearchBar/>
      </div>
      <div className='container'>
          <div className='row'>
            <div className='col-lg-12 text-center table-responsive'>
              {out_content}
            </div>
          </div>
      </div>
    </div>
  )
}

}
