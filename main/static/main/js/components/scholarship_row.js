
class ScholarshipRow extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    const scholarship = this.props.scholarship

    const title = scholarship['information']['title']
    const skills = get_comma_separated_value(scholarship['fields_of_interest'], 'title')

    return(
      <tr>
        <td>{title}</td>
        <td>{skills}</td>
      </tr>
    )

  }

}
