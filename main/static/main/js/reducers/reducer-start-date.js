

export default function start_date_reducer(state, action){


  if(typeof state == 'undefined'){
    return {'start_date': '' }
  }

  switch (action.type) {

    // update the start date state
    case 'CHANGE_START_DATE':
      return Object.assign({}, state, {start_date : action.start_date})
      break;

     default:
      return state

}

}
