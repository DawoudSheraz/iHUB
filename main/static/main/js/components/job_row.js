
// Component to render information about a single StudentJobPosition
class JobRow extends React.Component{

  constructor(props){
    super(props);
  }

render(){
  let job = this.props.job_data

  const title = job['job']['title']
  const skills = get_comma_separated_value(job['skills_covered'], 'title')

  return(
    <tr>
      <td>{title}</td>
      <td>{skills}</td>
    </tr>
  )

}
}
