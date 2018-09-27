

class ConferenceRow extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    const conference = this.props.conference;
    const data_target = '#' + conference['info']['title'].replace(' ','_')
    const modal_id = conference['info']['title'].replace(' ','_')
    const title = conference['info']['title']
    const venue = get_formatted_venue(conference['conference_venue'])
    const paper_deadline = get_format_date(conference['call_for_paper_deadline'])

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
                  <h4 className='text-primary'>Details </h4>
                  <p className='text-default'>{conference['info']['description']}</p>

                  {/*  Fields of Interest*/}
                  <h4 className='text-primary'>Fields of Interest </h4>
                  <TaggedList
                    data_list={json_list_to_item_list(conference['fields_of_interest'],'title')}
                  />

                  {/*  Venue*/}
                  <h4 className='text-primary'>Venue </h4>
                  <p className='text-success'>{venue}</p>

                  {/* Call for paper deadline */}

                  <h4 className='text-primary'>Call for Papers deadline </h4>
                  <p className='text-danger'>{paper_deadline}</p>

                  {/*  Conference Duration */}
                  <h4 className='text-primary'>Duration </h4>
                  <p> {get_format_date(conference['duration']['start_date'])} - &nbsp;
                    {get_format_date(conference['duration']['end_date'])}
                  </p>

                  {/*  Original Source */}
                  <h4 className='text-primary'>Source </h4>
                  <p>{conference['source']}</p>

                  {/*  If Ranking exist, render it */}
                  {conference['ranking']?(
                    <span>
                      <h5 className='text-primary'>Ranking</h5>
                      <p >{conference['ranking']}</p>
                    </span>)
                  : ''}

                  {/*  IF key speakers exist, render them */}
                  {conference['key_speakers']?(
                    <span>
                      <h5 className='text-primary'>Key Speakers</h5>
                      <p >{conference['key_speakers']}</p>
                    </span>)
                  : ''}


                  {/*  Accordian to Show various parts of overall data */}
                  <Accordion
                    accordion_id = {modal_id}
                    options = {
                      [
                          {'label': 'Sponsors',
                          'data': (
                            <TaggedList
                              data_list={json_list_to_item_list(conference['sponsors'],'name')}
                            />
                          )},
                          {
                            'label': 'Covered Expenses',
                            'data':
                            (
                              <table className='table table-striped table-hover table-bordered'>
                                <thead>
                                  <tr>
                                    <th>Amount</th>
                                    <th>Description</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {conference['covered_expenses'].map((current,index)=>(
                                    <tr key={index}>
                                      <td>{current['amount']}</td>
                                      <td>{current['description']}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )
                            },
                          {
                            'label' : 'Contact Information',
                            'data':   (
                              <span>
                                <TaggedList
                                  data_list={json_optional_key_list_to_item_list(conference['contacts'],'email')}
                                />
                                <TaggedList
                                  data_list={json_optional_key_list_to_item_list(conference['contacts'],'phone')}
                                />
                              </span>
                            )
                          },
                        {
                            'label': 'Schedule',
                            'data': (conference['schedule_list'].length > 0 )? (
                              <table className='table table-striped table-hover table-bordered'>
                                <thead>
                                  <tr>
                                    <th>Date</th>
                                    <th>Event</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {conference['schedule_list'].map((current,index)=>(
                                    <tr key={index}>
                                      <td>{formatted_date_time(current['date'])}</td>
                                      <td>{current['description']}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : 'Not Available'

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

    );
  }

}
