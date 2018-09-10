

export default function search_bar_reducer(state, action){

  if(typeof state == 'undefined'){
    return {'search_text':'', }
  }

  switch (action.type) {

    // update the text state
    case 'UPDATE_SEARCH_BAR_TEXT':
      return Object.assign({}, state, {search_text : action.search_text})
      break;

     default:
      return state

}

}
