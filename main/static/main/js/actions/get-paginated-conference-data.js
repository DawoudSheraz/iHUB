
// Paginated conference data, AJAX request different states
const REQUEST_PAGINATED_CONFERENCE_DATA = 'REQUEST_PAGINATED_CONFERENCE_DATA'
const GET_PAGINATED_CONFERENCE_DATA = 'GET_PAGINATED_CONFERENCE_DATA'
const UNSUCCESSFUL_REQUEST_PAGINATED_CONFERENCE_DATA = 'UNSUCCESSFUL_REQUEST_PAGINATED_CONFERENCE_DATA'
const SUCCESSFUL_REQUEST_PAGINATED_CONFERENCE_DATA = 'SUCCESSFUL_REQUEST_PAGINATED_CONFERENCE_DATA'

// creates action to get conference data from a particular pages
// the data will be returned as a result of AJAX call
function create_paginated_conference_data_action(conference_data){

  return ({
    type: GET_PAGINATED_CONFERENCE_DATA, conference_data
  })
}


// action to indicate AJAX request has started
function request_paginated_conference_data_action(conference_data_received){

    return(
      {
        type: REQUEST_PAGINATED_CONFERENCE_DATA, conference_data_received
      }

    )
}

// If request is not Successful
function unsuccessful_request_paginated_conference_data(){

  return(
    {
      type: UNSUCCESSFUL_REQUEST_PAGINATED_CONFERENCE_DATA
    }

  )
}

// If request is  Successful, mark the boolean as true
function successful_request_paginated_conference_data(conference_data_received){

  return(
    {
      type: SUCCESSFUL_REQUEST_PAGINATED_CONFERENCE_DATA, conference_data_received
    }

  )
}

// top action that will take care of the request and the related stuff
function request_conference_data(request_url, dispatch, store){

    // indicate the request has started
    dispatch(request_paginated_conference_data_action(false));

    console.log('request dispatched')

    $.ajax({
      'url': request_url,
      method:'GET',
      success: function(data){
        console.log('successs')
        // If success, update the data and data_received boolean
        dispatch(create_paginated_conference_data_action(data));
        dispatch(successful_request_paginated_conference_data(true));
        //console.log(store.getState())
      }
      , error:function(error){
        console.log('error')
        dispatch(unsuccessful_request_paginated_conference_data())
      }
    })



}
