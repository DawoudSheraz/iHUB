
const mapStateToProps = state => ({
  new_date: state.end_date_picker.end_date,

})

//  Prop used by the component to dispatch the action to the store
const mapDispatchToProps = (dispatch) => ({

    update_date : (value) => {
      dispatch(update_end_date(value))
    }

})

window.ContainerEndDate = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(EndDatePicker)
