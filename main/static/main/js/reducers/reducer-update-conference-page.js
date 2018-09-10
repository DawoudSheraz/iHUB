

// Returns the data for a particular page
// no need of appending to previous state as
// when page changes, so does the overall data
 export default function paginated_conference_reducer(state, action){

   if(typeof state == 'undefined'){
     return {'conference_data':'', 'conference_data_received': false}
   }

    switch (action.type) {

      // If AJAX request started,
      case 'REQUEST_PAGINATED_CONFERENCE_DATA':
        return Object.assign({}, state, {conference_data_received : action.conference_data_received})
        break;

      // When data received
      case 'GET_PAGINATED_CONFERENCE_DATA':
        return Object.assign({}, state, {conference_data : action.conference_data})
        break;

      // If request is not successful, show the previous data
      case 'UNSUCCESSFUL_REQUEST_PAGINATED_CONFERENCE_DATA':
          return state
          break;

      case 'SUCCESSFUL_REQUEST_PAGINATED_CONFERENCE_DATA':
          return Object.assign({}, state, {conference_data_received : action.conference_data_received})
          break;

      default:
      return state

    }

}
