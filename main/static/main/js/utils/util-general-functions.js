// Some common functions to be used by multiple components

// fields_of_interest is a list of json,
// this fn. creates a string of the list
  function get_comma_separated_value(skill_list, key){
    let out_var = ''
    for(var count=0; count<skill_list.length; count++){

      out_var += skill_list[count][key] + ','
    }
    return out_var

  }

// capitalize the first letter
  function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

// Format the conference venue (city is null in some cases)
  function get_formatted_venue(venue_json){

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
  function get_format_date(orig_val){
    return (new Date(Date.parse(orig_val))).toLocaleDateString()
  }

  // Given the search text, check if that text exists as value at any list index item
  function check_text_inside_json_list(search_query, json_list){

    let record_found = false
    for(var count=0; count< json_list.length; count++){
      if(json_list[count]['title'].toLowerCase().includes(search_query)){
        record_found = true
        break;
      }
    }

    return record_found;
  }
