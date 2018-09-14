
// Page showing the contents of the Student Job Position
function JobPage(props){

  return(
    <div className='container'>
          <div className='row'>
            <div className='col-lg-12 text-center table-responsive'>
              <window.ContainerSearchBar/>
              <FilterableJobTable_Connected
              base_url={props.app_data['job_base_url']}
              load_img={props.app_data['load_img']}/>
            </div>
          </div>
      </div>
  )
}
