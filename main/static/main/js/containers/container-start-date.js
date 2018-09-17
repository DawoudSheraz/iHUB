
const mapStateToProps = state => ({
  new_date: state.start_date_picker.start_date,

})

//  Prop used by the component to dispatch the action to the store
const mapDispatchToProps = (dispatch) => ({

    update_date : (value) => {
      dispatch(update_start_date(value))
    }

})

window.ContainerStartDate = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(startDatePicker)
