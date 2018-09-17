
// All the content of the conference page
function ConferencePage(props){
  return(
    <div className='container'>
          <div className='row'>
            <div className='col-lg-12 text-center table-responsive'>

              <window.ContainerSearchBar/>
              <window.ContainerStartDate />
              <FilterableConferenceTable_Connected

                load_img={props.app_data['load_img']}
                  />
            </div>
          </div>
    </div>
  )
}
