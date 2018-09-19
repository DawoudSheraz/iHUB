
// Returns navbar type link, allowing to search
// either Conference, Job, or Scholarship
class FeatureNavBar extends React.Component{

  constructor(props){
    super(props);
    this.return_selected = this.return_selected.bind(this)
  }

  return_selected(event){
    this.props.updateOnClick(event.target.value)
  }

render(){

  return(
    <div className='container'>
      <div className='row'>
        {/*  If any button content is currently being displayed, disable that button*/}
          <button className='btn btn-link col-md-4 col-xs-12' disabled={this.props.current=='Conference' ? true: false} onClick={this.return_selected} value='Conference'>Conferences</button>
          <button className='btn btn-link col-md-4 col-xs-12' disabled={this.props.current=='Job' ? true: false}onClick={this.return_selected} value='Job'>Student Job Positions</button>
          <button className='btn btn-link col-md-4 col-xs-12' disabled={this.props.current=='Scholarship' ? true: false}onClick={this.return_selected} value='Scholarship'>Scholarships</button>
      </div>
    </div>

  )
}

}
