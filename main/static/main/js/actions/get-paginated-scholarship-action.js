
const REQUEST_DATA = 'REQUEST_DATA'
const GET_DATA = 'GET_DATA'
const UNSUCCESSFUL_REQUEST = 'UNSUCCESSFUL_REQUEST'
const SUCCESSFUL_REQUEST = 'SUCCESSFUL_REQUEST'

// Starting the request action
function action_request_data(scholarship_data_received){

  return({
    type: REQUEST_DATA, scholarship_data_received
  })
}

// GET data successful
function action_get_data(scholarship_data){

  return({
    type: GET_DATA, scholarship_data
  })
}

// unsuccessful request
function action_unsuccessful_request(){

  return({
    type: UNSUCCESSFUL_REQUEST
  })
}

// successful request
function action_successful_request(scholarship_data_received){

  return({
    type: SUCCESSFUL_REQUEST, scholarship_data_received
  })
}

// AJAX Request to the Scholarship data api
function request_scholarship_data(request_url, dispatch){

  dispatch(action_request_data(false));

  axios.get(request_url)
  .then(function (response){
    dispatch(action_get_data(response.data))
    dispatch(action_successful_request(true))
  })
  .catch(function (error){
    console.log(error)
    dispatch(action_unsuccessful_request())
  })

  // $.ajax({
  //
  //   'url':request_url,
  //   method:'GET',
  //   success: function(data){
  //     dispatch(action_get_data(data))
  //     dispatch(action_successful_request(true))
  //   },
  //   error: function(error){
  //     dispatch(action_unsuccessful_request())
  //   }
  // })

}
