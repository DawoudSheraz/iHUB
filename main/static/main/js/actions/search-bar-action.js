
const UPDATE_SEARCH_BAR_TEXT = 'UPDATE_SEARCH_BAR_TEXT'

// Action to update the existing state of the search bar
function update_search_bar_text(search_text){

    return({
      type: UPDATE_SEARCH_BAR_TEXT, search_text
    })
}
