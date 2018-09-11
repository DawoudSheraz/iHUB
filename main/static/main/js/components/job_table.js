

// Displays the jobs as the table
class JobList extends React.Component{

  constructor(props){
    super(props);
  }


  render(){

    const data = this.props.job_list
    let out_row = []

    // Create ConferenceRow component for each entry in list
    data.forEach( (job) => {

        // if search_text is not empty and text is not found inside any skills_covered,
        // do not render that Job
        if(this.props.search_text!='' &&
        !check_text_inside_json_list(this.props.search_text.toLowerCase(), job['skills_covered'])){
          return;
        }

      // key is required by React to uniquely identify each row
      out_row.push( <JobRow job_data= {job} key={job['job']['title']}/>)
    }
    );

  return(
    <table border='1'>
      <thead>
        <tr>
          <td>Student Positions</td>
        </tr>
      </thead>

      <tbody>
        {out_row}
      </tbody>

    </table>

  )

  }

}
