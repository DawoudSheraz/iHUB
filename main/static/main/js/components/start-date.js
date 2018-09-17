
class startDatePicker extends React.Component{

  constructor(props){
    super(props);

    this.updateState = this.updateState.bind(this)
  }


  updateState(e){

    if(e==null){
      this.props.update_date('')
    }
    else{
      // let out_str = (e.format('YYYY-MM'))
      this.props.update_date(e)
    }
  }

render(){
  return(
    <div>
      Start Date(Month & Year)
      <DatePicker
        isClearable={true}
        placeholderText='YYYY-MM'
        dateFormat="YYYY/MM"
        selected={this.props.new_date}
        onChange={this.updateState} />
    </div>
  )
}

}
