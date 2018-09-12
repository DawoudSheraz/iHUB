

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

      // key is required by React to uniquely identify each row
      out_row.push( <JobRow job_data= {job} key={job['job']['title']}/>)
    }
    );

  return(
    <table border='1' className='table table-striped table-hover'>
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
