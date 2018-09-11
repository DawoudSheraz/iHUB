
function App(props){

  return(
    <div>
      <div className='text-center'>
        <window.ContainerSearchBar/>
      </div>
      <div className='container'>
          <div className='row'>

            <div className='col-lg-4'>
              <FilterableConferenceTable_Connected
                base_url={props.app_data['conf_base_url']}
                load_img={props.app_data['load_img']}
                   />
            </div>

            <div className='col-lg-4'>
              <FilterableJobTable_Connected
              base_url={props.app_data['job_base_url']}
              load_img={props.app_data['load_img']}/>
            </div>

            <div className='col-lg-4'>
              <FilterableScholarshipTable_Connected
              base_url={props.app_data['sch_base_url']}
              load_img={props.app_data['load_img']}/>
            </div>

          </div>
      </div>
    </div>
  )
}
