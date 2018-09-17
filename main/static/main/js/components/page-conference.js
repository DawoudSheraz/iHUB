
// All the content of the conference page
class  ConferencePage extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      'country_search_text': ''
    }
    this.update_country_text = this.update_country_text.bind(this)
  }

  update_country_text(e){
    this.setState({
      country_search_text:e
    })
  }

  render(){
  return(
    <div className='container'>

      <div className='row'>
        <div className='col-md-6'>
            <window.ContainerSearchBar/>
        </div>
        <div className='col-md-6'>
          <InternallyControlledSearchBar
                  onEditAction={this.update_country_text}
                  text_val = {this.state.country_search_text}
                  placeholder_text={'Search on Country'}/>
        </div>
        <div className='col-md-6'>
          <window.ContainerStartDate />
        </div>
        <div className='col-md-6'>
            <window.ContainerEndDate date_description={'Call for Papers Deadline'}/>
        </div>
      </div>
          <div className='row'>

            <div className='col-lg-12 text-center table-responsive'>

              <FilterableConferenceTable_Connected
                load_img={this.props.app_data['load_img']}
                country_search_text={this.state.country_search_text}/>
            </div>
          </div>
    </div>
  )
}
}
