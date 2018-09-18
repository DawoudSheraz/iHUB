
class SuggestionForm extends React.Component{

  constructor(props){
    super(props);
    this.submitted_values = this.submitted_values.bind(this)
  }

  submitted_values(values){
    console.log(values)
  }
  render(){

    const Field = ReduxForm.Field
    const {handleSubmit} = this.props
    return(
      <form onSubmit={handleSubmit(this.submitted_values)}>

        {/*  Full name */}
        <Field name='fullName' component={renderField} type='text' label='Name'/>

        {/*  Email */}
        <Field name='email' component={renderField} type='email' label='Email'/>


        {/*  Problematic Service*/}
        <div>
            <label htmlFor='problem_area'>Problematic Service</label>
            <div>
              <div>
                <label>
                  <Field name='problem_area' component='input' type='radio' value='Conference'/>
                  {' '}
                  Conference
                </label>
              </div>
              <div>
                <label>
                  <Field name='problem_area' component='input' type='radio' value='Student_Position'/>
                  {' '}
                  Student Position
                </label>
              </div>
              <div>
                <label>
                  <Field name='problem_area' component='input' type='radio' value='Scholarship'/>
                  {' '}
                  Scholarship
                </label>
              </div>
            </div>

        </div>

        {/*  Complaint Nature*/}
        <div>
          <label htmlFor='complaint_nature'>Complaint Nature</label>
          <div>
            <Field name='complaint_nature' component='select'>
              <option value=''> -- Select the Complaint Type -- </option>
              <option value='performance'>Performance</option>
              <option value='data'>Incorrect Data</option>
              <option value='source'>Invalid Source</option>
            </Field>
          </div>
        </div>

        <div>
          <label>Description</label>
          <Field component='textarea' type='textarea' name='description'/>
        </div>

        <button type="submit">Submit</button>
      </form>
    )

  }
}


const form_sync_validate = values =>{

  const errors = {}

  if(!values.fullName){
    errors.fullName = 'Required!'
  }
  else if (values.fullName.length <5){
    errors.fullName = 'Must be atleast 5 characters'
  }

  if(!values.email){
    errors.email = 'Email Required'
  }

  return errors
}

var ConnectedSuggestionForm = ReduxForm.reduxForm({
  form:'suggestion',
  validate: form_sync_validate
})(SuggestionForm)
