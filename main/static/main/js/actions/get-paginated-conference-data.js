

export const GET_PAGINATED_CONFERENCE_DATA = 'GET_PAGINATED_CONFERENCE_DATA'


// creates action to get conference data from a particular pages
// the data will be returned as a result of AJAX call
export function create_paginated_conference_data_action(data){
  return ({
    type: GET_PAGINATED_CONFERENCE_DATA, data
  })
}
