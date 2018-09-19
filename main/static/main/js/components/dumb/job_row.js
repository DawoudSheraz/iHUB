
// Component to render information about a single StudentJobPosition
class JobRow extends React.Component{

  constructor(props){
    super(props);
  }

render(){
  const job = this.props.job_data
  const data_target = '#' + job['job']['title'].replace(' ','_')
  const modal_id = job['job']['title'].replace(' ','_')
  const title = job['job']['title']
  const skills = get_comma_separated_value(job['skills_covered'], 'title')

  return(
    <tr>
      <td><a className='btn btn-link' data-toggle="modal" data-target={data_target}> {title} </a>


        <div className="modal fade" id={modal_id} role="dialog">
          <div className="modal-dialog">

            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">{title}</h4>
              </div>

              <div className="modal-body">

                {/*  Job Details */}
                <div className="modal-body">

                <h4 className='text-info'>Information </h4>
                <p>
                  <span className='text-info'>Type: &nbsp;</span>
                  <span>{job['job']['type']}</span>
                </p>
                <p>
                  <span className='text-info'>Description: &nbsp;</span>
                  <span>{job['job']['description']}</span>
                </p>
                <p>
                  <span className='text-info'>Function: &nbsp;</span>
                  <span>{job['job']['function']}</span>
                </p>
                <p>
                  <span className='text-info'>Expectations: &nbsp;</span>
                  <span>{job['job']['expectations']}</span>
                </p>
              </div>


                {/*  Fields of Interest*/}
                <h4 className='text-primary'>Fields of Interest </h4>
                <p className='text-default'>{skills}</p>

                {/*  Submission Deadline*/}
                <h4 className='text-primary'>Submission deadline </h4>
                <p className='text-danger'>{get_format_date(job['deadline'])}</p>

                {/*  Job Duration */}
                <h4 className='text-primary'>Duration </h4>
                <p> {get_format_date(job['duration']['start_date'])} - &nbsp;
                  {get_format_date(job['duration']['end_date'])}
                </p>

                {/*  Venue */}
                <h4 className='text-primary'>Venue </h4>
                <p >{get_formatted_venue(job['job_location'])}</p>

                {/*  Salary */}
                <h4 className='text-primary'>Salary</h4>
                <p >{job['salary']['amount']}</p>

                {/*  Experience Required*/}
                <h4 className='text-primary'>Experience Required</h4>
                <h4 className='text-warning'>{job['experience_required']}</h4>

                {/*  Provided by*/}
                <h4 className='text-primary'>Provided by</h4>
                <p>{job['job_provider']['name']}</p>

                {/*  Original Source */}
                <h4 className='text-primary'>Source </h4>
                <p>{job['source']}</p>


              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>

          </div>
          </div>

      </td>
    </tr>
  )

}
}
