

// Displays the jobs as the table
function JobList(props){


    const data = props.job_list
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
          <th>Student Positions</th>
        </tr>
      </thead>

      <tbody>
        {out_row}
      </tbody>

    </table>

  )

}
