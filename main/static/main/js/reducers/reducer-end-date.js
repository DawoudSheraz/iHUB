

export default function end_date_reducer(state, action){


  if(typeof state == 'undefined'){
    return {'end_date':'' }
  }

  switch (action.type) {

    // update the end date state
    case 'CHANGE_END_DATE':
      return Object.assign({}, state, {end_date : action.end_date})
      break;

     default:
      return state

}

}
