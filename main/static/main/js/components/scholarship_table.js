
class ScholarshipList extends React.Component{

    constructor(props){
      super(props);
    }

    render(){

      let out_rows = []
      const scholarships = this.props.scholarship_list

      scholarships.forEach( (scholarship) => {

      out_rows.push(<ScholarshipRow scholarship = {scholarship} key={scholarship['information']['title']}/>)
      });

      return(
        <table border='1'>
          <thead>
            <tr>
              <td>Scholarships</td>
            </tr>
          </thead>

          <tbody>
            {out_rows}
          </tbody>

        </table>
      )
    }

}
