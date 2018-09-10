
class ScholarshipList extends React.Component{

    constructor(props){
      super(props);
    }

    render(){

      let out_rows = []
      const scholarships = this.props.scholarship_list
      
      scholarships.forEach( (scholarship) => {

        if(this.props.search_text!='' &&
      !check_text_inside_json_list(this.props.search_text.toLowerCase(), scholarship['fields_of_interest'])){
        return;
      }
      out_rows.push(<ScholarshipRow scholarship = {scholarship} key={scholarship['information']['title']}/>)
      });

      return(
        <table border='1'>
          <thead>
            <tr>
              <td>Title</td>
              <td>Skills</td>
            </tr>
          </thead>

          <tbody>
            {out_rows}
          </tbody>

        </table>
      )
    }

}
