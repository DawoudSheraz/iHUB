//import React, {Component} from 'react'// Displays the title and fields_of_interest of a conference
class ConferenceRow extends React.Component{

  constructor(props){
    super(props);
  }

// fields_of_interest is a list of json,
// this fn. creates a string of the list
  get_comma_separated_value(skill_list, key){
    let out_var = ''
    for(var count=0; count<skill_list.length; count++){

      out_var += skill_list[count][key] + ','
    }
    return out_var

  }

// capitalize the first letter
  capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

// Format the conference venue (city is null in some cases)
  get_conference_venue(venue_json){

    let out_val = ''

    if(venue_json.hasOwnProperty('city')){
      out_val = venue_json['name'] + ',' + venue_json['city'] + ','
      + this.capitalize(venue_json['country'])
    }
    else{
      out_val = venue_json['name'] + ',' + this.capitalize(venue_json['country'])
    }
    return out_val
  }

  // Format the data returned from the json
  get_format_date(orig_val){
    return (new Date(Date.parse(orig_val))).toLocaleDateString()
  }

  render(){
    const conference = this.props.conference;
    const data_target = '#' + conference['info']['title'].replace(' ','_')
    const modal_id = conference['info']['title'].replace(' ','_')
    const title = conference['info']['title']
    const skills = this.get_comma_separated_value(conference['fields_of_interest'], 'title')
    const venue = this.get_conference_venue(conference['conference_venue'])
    const paper_deadline = this.get_format_date(conference['call_for_paper_deadline'])

    return(
      <tr>
        <td><a className='btn btn-link' data-toggle="modal" data-target={data_target}>{title}</a></td>
        <td>{skills}
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
                  <p className='text-default'>{skills}</p>

                  {/*  Venue*/}
                  <h4 className='text-primary'>Venue </h4>
                  <p className='text-success'>{venue}</p>

                  {/* Call for paper deadline */}

                  <h4 className='text-primary'>Call for Papers deadline </h4>
                  <p className='text-danger'>{paper_deadline}</p>

                  {/*  Conference Duration */}
                  <h4 className='text-primary'>Duration </h4>
                  <p> {this.get_format_date(conference['duration']['start_date'])} - &nbsp;
                    {this.get_format_date(conference['duration']['end_date'])}
                  </p>

                  {/*  Original Source */}
                  <h4 className='text-primary'>Source </h4>
                  <p>{conference['source']}</p>

                  {/*  Sponsors */}
                  <h4 className='text-primary'>Sponsors </h4>
                  <p>{this.get_comma_separated_value(conference['sponsors'], 'name')}</p>


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
