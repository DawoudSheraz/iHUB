//import React, {Component} from 'react'// Displays the title and fields_of_interest of a conference
class ConferenceRow extends React.Component{

  constructor(props){
    super(props);
  }

// fields_of_interest is a list of json,
// this fn. creates a string of the list
  get_comma_separated_skills(skill_list){
    let out_var = ''
    for(var count=0; count<skill_list.length; count++){

      out_var += skill_list[count]['title'] + ','
    }
    return out_var

  }

  render(){
    const conference = this.props.conference;

    const title = conference['info']['title']
    const skills = this.get_comma_separated_skills(conference['fields_of_interest'])

    return(
      <tr>
        <td>{title}</td>
        <td>{skills}</td>
      </tr>
    );
  }

}
