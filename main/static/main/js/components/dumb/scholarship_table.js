
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
        <table border='1' className='table table-striped table-hover'>
          <thead>
            <tr>
              <th>Scholarships</th>
            </tr>
          </thead>

          <tbody>
            {out_rows}
          </tbody>

        </table>
      )
    }

}
