
class EndDatePicker extends React.Component{

  constructor(props){
    super(props)
    this.date_selected = this.date_selected.bind(this)
  }

  date_selected(date){

    // If cleared, update the parent state with empty value
    if(date==null){
      this.props.update_date('')
    }
    else{
      this.props.update_date(date)
    }

  }

  render(){

    return(

      <div>{this.props.date_description}
        <DatePicker
          isClearable={true}
          placeholderText='YYYY-MM'
          dateFormat="YYYY/MM"
          selected={this.props.new_date}
          onChange={this.date_selected} />
    </div>
    )
  }
}

EndDatePicker.defaultProps = {
  date_description : 'Deadline',
  update_date : () => null,

}
