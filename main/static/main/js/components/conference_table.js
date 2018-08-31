
// Displays the conferences as a table
class ConferenceList extends React.Component{

  constructor(props){
    super(props);

  }

  // Given the search text from FilterableConferenceTable
  // display only those conferences whose fields_of_interest has that search_text
  check_text_inside_json_list(search_query, json_list){

    let record_found = false
    for(var count=0; count< json_list.length; count++){
      if(json_list[count]['title'].toLowerCase().includes(search_query)){
        record_found = true
        break;
      }
    }

    return record_found;
  }

  render(){

    const data = this.props.conference_list
    let out_row = []

    // Create ConferenceRow component for each entry in list
    data.forEach( (conference) => {

        // if search_text is not empty and text is not found inside any field_of_interest,
        // do not render that conference
        if(this.props.search_text!='' &&
        !this.check_text_inside_json_list(this.props.search_text.toLowerCase(), conference['fields_of_interest'])){
          return;
        }

      // key is required by React to uniquely identify each row
      out_row.push( <ConferenceRow conference= {conference} key={conference['info']['title']}/>)
    }
    );

  return(
    <table border="1" className="centerTable">
      <thead>
        <tr>
          <td>Title</td>
          <td>Skills</td>
        </tr>
      </thead>

      <tbody>
        {out_row}
      </tbody>

    </table>

  )

  }

}
