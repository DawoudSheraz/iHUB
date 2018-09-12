


// Displays the conferences as a table
class ConferenceList extends React.Component{

  constructor(props){
    super(props);
  }

  render(){

    const data = this.props.conference_list
    let out_row = []

    // Create ConferenceRow component for each entry in list
    data.forEach( (conference) => {

      // key is required by React to uniquely identify each row
      out_row.push( <ConferenceRow template_path={this.props.template_path} conference= {conference} key={conference['info']['title']}/>)
    }
    );

  return(
    <table border='1'>
      <thead>
        <tr>
          <td>Conferences</td>
        </tr>
      </thead>

      <tbody>
        {out_row}
      </tbody>

    </table>

  )

  }

}
