


// Displays the conferences as a table
function ConferenceList(props){


    const data = props.conference_list
    let out_row = []

    // Create ConferenceRow component for each entry in list
    data.forEach( (conference) => {
      // key is required by React to uniquely identify each row
      out_row.push( <ConferenceRow conference= {conference} key={conference['info']['title']}/>)
    }
    );

  return(
    <table border='1' className='table table-striped table-hover'>
      <thead >
        <tr>
          <th>Conferences</th>
        </tr>
      </thead>

      <tbody>
        {out_row}
      </tbody>

    </table>

  )

  }
