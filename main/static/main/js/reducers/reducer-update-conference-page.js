

// Returns the data for a particular page
// no need of appending to previous state as
// when page changes, so does the overall data
 export function paginated_conference_reducer(state, action){

    if(typeof state == 'undefined'){
      return initial_state
    }
    switch (action.type) {
      case GET_PAGINATED_CONFERENCE_DATA:
          return action.data
          break;
      default:
      return state

    }

}

export default function test_function(){
  console.log('hello')
}

// export {test_function}
// module.exports = paginated_conference_reducer
