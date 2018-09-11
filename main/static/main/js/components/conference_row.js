

class ConferenceRow extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      'content':''
    }
  }

  //
  // componentDidMount(){
  //   this.get_template_html(this.props.template_path)
  // }
  //
  // get_template_html(file_path){
  //   var rawFile = new XMLHttpRequest();
  //   rawFile.open("GET", file_path, true);
  //   rawFile.onreadystatechange = function ()
  //   {
  //       if(rawFile.readyState === 4)
  //       {
  //           if(rawFile.status === 200 || rawFile.status == 0)
  //           {
  //               this.setState ({
  //                 content: rawFile.responseText});
  //           }
  //       }
  //   }.bind(this)
  //   rawFile.send(null);
  

  render(){
    const conference = this.props.conference;
    const data_target = '#' + conference['info']['title'].replace(' ','_')
    const modal_id = conference['info']['title'].replace(' ','_')
    const title = conference['info']['title']
    const skills = get_comma_separated_value(conference['fields_of_interest'], 'title')
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
                  <p className='text-default'>{skills}</p>

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

                  {/*  Sponsors */}
                  <h4 className='text-primary'>Sponsors </h4>
                  <p>{get_comma_separated_value(conference['sponsors'], 'name')}</p>


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
