
// Page displaying attributes related to Scholarships
function ScholarshipPage(props){

  return(
    <div className='container'>
          <div className='row'>
            <div className='col-lg-12 text-center table-responsive'>
              <window.ContainerSearchBar/>
              <FilterableScholarshipTable_Connected
              base_url={props.app_data['sch_base_url']}
              load_img={props.app_data['load_img']}/>
            </div>
          </div>
    </div>
  )
}
