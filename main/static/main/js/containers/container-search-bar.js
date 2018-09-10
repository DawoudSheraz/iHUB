// import update_search_bar_text from '../actions/search-bar-action.js'

const mapStateToProps = state => ({
  search_text: state.search_bar.search_text,

})

//  Prop used by the component to dispatch the action to the store
const mapDispatchToProps = (dispatch) => ({

    onEditAction : (value) => {
      dispatch(update_search_bar_text(value))
    }

})

window.ContainerSearchBar = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ControlledSearchBar)
