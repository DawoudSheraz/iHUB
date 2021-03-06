
class ScholarshipRow extends React.Component{

  constructor(props){
    super(props);
  }

  get_all_venues(data_list){
    let out_row = []

    data_list.forEach(venue => {
      out_row.push(<p key={venue.name + venue.country}> {get_formatted_venue(venue)} </p>)
    })
    return out_row
  }


  render(){
    const scholarship = this.props.scholarship

    const data_target = '#' + scholarship['information']['title'].replace(' ','_')
    const modal_id = scholarship['information']['title'].replace(' ','_')
    const title = scholarship['information']['title']

    return(
      <tr>
        <td><a className='btn btn-link' data-toggle="modal" data-target={data_target}>{title}</a>


          <div className="modal fade" id={modal_id} role="dialog">
            <div className="modal-dialog">

              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">{title}</h4>
                </div>

                <div className="modal-body">

                  {/*  Details */}
                  <h3 className='text-primary'> About </h3>
                  <p>{scholarship['information']['description']}</p>

                  {/*  Fields of Interest*/}
                  <h4 className='text-primary'>Fields of Interest </h4>
                  <TaggedList
                    data_list={json_list_to_item_list(scholarship['fields_of_interest'],'title')}
                  />

                  {/*  Positions*/}
                  <p>
                    <span className='text-info'>Open Positions: &nbsp;</span>
                    <span>{scholarship['number_of_positions']}</span>
                  </p>

                  {/*  Amount*/}
                  <p>
                    <span className='text-info'>Granted Amount: &nbsp;</span>
                    <span>{scholarship['amount_granted']['amount']}</span>
                  </p>

                  {/*  Scholarship Duration */}
                  <h4 className='text-primary'>Duration </h4>
                  <p> {get_format_date(scholarship['duration']['start_date'])} - &nbsp;
                    {get_format_date(scholarship['duration']['end_date'])}
                  </p>

                  {/*  Submission Deadline */}
                  <h4 className='text-primary'>Submission Deadline </h4>
                  <p className='text-danger'> {get_format_date(scholarship['deadline'])}
                  </p>

                  {/*  Source */}
                  <h4 className='text-primary'>Source </h4>
                  <p>{scholarship['source']}</p>

                  {/*  Optional Attributes -- Start*/}

                  {scholarship['funding']?
                  (<span>
                    <h5 className='text-primary'>Funding</h5>
                    <p >{scholarship['funding']}</p>
                  </span>)
                  : ''
                  }

                  {scholarship['scholarship_maintenance_criteria']?
                  (<span>
                    <h5 className='text-primary'>Maintenance Criteria</h5>
                    <p >{scholarship['scholarship_maintenance_criteria']}</p>
                  </span>)
                  : ''
                  }

                  {/*  Optional Attribute  -- End */}


                  <Accordion
                  accordion_id = {modal_id}
                  options = {
                    [
                      {
                        'label' : 'Sponsors',
                        'data' : (
                          <TaggedList
                            data_list={json_list_to_item_list(scholarship['sponsors'],'name')}
                          />
                        )
                      },
                      {
                        'label': 'Perks Offered',
                        'data' : scholarship['perks_offered']
                      },
                      {
                        'label' : 'Host Locations',
                        'data' : (
                          this.get_all_venues(scholarship['host_universities'])
                        )
                      },
                      {
                        'label' : 'Contact',
                        'data': (
                          <span>
                            <TaggedList
                              data_list={json_optional_key_list_to_item_list(scholarship['contacts'],'email')}
                            />
                            <TaggedList
                              data_list={json_optional_key_list_to_item_list(scholarship['contacts'],'phone')}
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
                                <td>{scholarship['application_form']['required_docs']}</td>
                              </tr>
                              <tr>
                                <th>Procedure</th>
                                <td>{scholarship['application_form']['steps_to_apply']}</td>
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
                                <td>{scholarship['criteria']['minimum']}</td>
                              </tr>

                              <tr>
                                <th>Preferred</th>
                                <td>
                                  { scholarship['criteria']['preferred'] ?
                                  scholarship['criteria']['preferred']
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

}
