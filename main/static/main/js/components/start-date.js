
class startDatePicker extends React.Component{

  constructor(props){
    super(props);

    this.updateState = this.updateState.bind(this)
  }

// new value is dispatched to the store
  updateState(e){
    // If date is cleared, the Date var becomes null
    if(e==null){
      this.props.update_date('')
    }
    else{
      this.props.update_date(e)
    }
  }

render(){
  return(
    <div>
      Starting Period
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
