
class CustomDatePicker extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      'new_date': moment()
    }
    this.date_selected = this.date_selected.bind(this)
  }

  date_selected(e){

    this.setState({
      new_date:e
    })

    if(e==null){
      this.props.bubble_date('')
    }
    else{
      let out_str = (e.format('YYYY-MM'))
      this.props.bubble_date(out_str)
    }

  }


  render(){

    return(

      <div>{this.props.date_description}
        <DatePicker
          isClearable={true}
          placeholderText='YYYY-MM'
          dateFormat="YYYY/MM/DD"
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
