
// Component to render information about a single StudentJobPosition
function JobRow(props){

  const job = props.job_data
  const data_target = '#' + job['job']['title'].replace(' ','_')
  const modal_id = job['job']['title'].replace(' ','_')
  const title = job['job']['title']

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

              {job['job']['expectations'] ?
                <p>
                  <span className='text-info'>Expectations: &nbsp;</span>
                  <span>{job['job']['expectations']}</span>
                </p>
                : ''
              }

              </div>


                {/*  Fields of Interest*/}
                <h4 className='text-primary'>Fields of Interest </h4>
                <TaggedList
                  data_list={json_list_to_item_list(job['skills_covered'],'title')}
                />

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

                {/*  IF fee exist, render it */}
                {job['fee']?(
                  <span>
                    <h5 className='text-primary'>Submission Fee</h5>
                    <p >{job['fee']['amount']}</p>
                  </span>)
                : ''}


                <Accordion
                  accordion_id = {modal_id}

                  options = {
                    [
                      {
                        'label' : 'Contact',
                        'data':   (
                          <span>
                            <TaggedList
                              data_list={json_optional_key_list_to_item_list(job['contacts'],'email')}
                            />
                            <TaggedList
                              data_list={json_optional_key_list_to_item_list(job['contacts'],'phone')}
                            />
                          </span>
                        )
                      },
                      {
                        'label': 'Application Submission Information',
                        'data' : (
                          <table className='table table-striped table-hover table-bordered'>
                            <tbody>
                              <tr>
                                <th>Required Documents</th>
                                <td>{job['submission_form']['required_docs']}</td>
                              </tr>
                              <tr>
                                <th>Procedure</th>
                                <td>{job['submission_form']['steps_to_apply']}</td>
                              </tr>

                            </tbody>
                          </table>
                        )
                      },
                      {
                        'label' : 'Requirements',
                        'data' : (
                          <table className='table table-striped table-hover table-bordered'>
                            <tbody>
                              <tr>
                                <th>Minimum</th>
                                <td>{job['requirements']['minimum']}</td>
                              </tr>

                              <tr>
                                <th>Preferred</th>
                                <td>
                                  { job['requirements']['preferred'] ?
                                  job['requirements']['preferred']
                                  : <strong>{'Not Available'}</strong>
                                  }
                                </td>
                              </tr>


                            </tbody>
                          </table>
                        )
                      }

                    ]
                  }
                />


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
