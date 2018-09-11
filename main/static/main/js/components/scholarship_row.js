
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
    const skills = get_comma_separated_value(scholarship['fields_of_interest'], 'title')

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
                  <p className='text-default'>{skills}</p>

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

                  {/* Host Locations */}
                  <h4 className='text-primary'>Host Locations</h4>
                  {this.get_all_venues(scholarship['host_universities'])}

                  {/*  Sponsors */}

                  <h4 className='text-primary'>Sponsors</h4>
                  <p>{get_comma_separated_value(scholarship['sponsors'],'name')}</p>

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
