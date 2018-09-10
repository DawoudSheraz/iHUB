

export default function paginated_scholarship_reducer(state, action){

    if(typeof state == 'undefined'){
      return ({'scholarship_data':'', 'scholarship_data_received':''})
    }

    switch (action.type) {

      // When starting the AJAX request or completed
      case 'REQUEST_DATA':
      case 'SUCCESSFUL_REQUEST':
        return Object.assign({}, state, {scholarship_data_received: action.scholarship_data_received})
        break;

      // When data received
      case 'GET_DATA':
      return Object.assign({}, state, {scholarship_data: action.scholarship_data})
      break;

      case 'UNSUCCESSFUL_REQUEST':
      default:
        return state;

    }
}
