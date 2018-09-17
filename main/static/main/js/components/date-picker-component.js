
class CustomDatePicker extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      'new_date': moment()
    }
    this.date_selected = this.date_selected.bind(this)
  }

  date_selected(date){

    this.setState({
      new_date:date
    })
    // If cleared, update the parent state with empty value
    if(date==null){
      this.props.bubble_date('')
    }
    else{
      this.props.bubble_date(date)
    }

  }

  render(){

    return(

      <div>{this.props.date_description}
        <DatePicker
          isClearable={true}
          placeholderText='YYYY-MM'
          dateFormat="YYYY/MM"
          selected={this.state.new_date}
          onChange={this.date_selected} />
    </div>
    )
  }
}

CustomDatePicker.defaultProps = {
  date_description : 'Deadline',
  bubble_date : () => null,

}
