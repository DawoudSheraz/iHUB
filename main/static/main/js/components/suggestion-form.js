
class SuggestionForm extends React.Component{

  constructor(props){
    super(props);
    this.submitted_values = this.submitted_values.bind(this)
  }

  submitted_values(values){
    axios.post(this.props.post_url, values)
    .then(function (response){
      alert('Thanks for your Feedback!')
      this.props.history.push('/')
    }.bind(this))
    .catch(function (error){
      alert(error)
    })
  }

  render(){

    const {registered_user} = this.props
    const Field = ReduxForm.Field
    const {handleSubmit} = this.props
    return(
      <div className="login-form">
      <form onSubmit={handleSubmit(this.submitted_values)} className='container login-form row col-lg-12'>

        {/*  Full name */}
        <Field name='fullName' validate = {[required, minLength5]} component={renderField} type='text' label='Name'/>

        {/*  Email */}
        <Field name='email' validate = {[required]} component={renderField} type='email' label='Email'/>


        {/*  Problematic Service*/}
        <div>
            <Field name='problem_area'
            component={renderRadioGroup}
            label='Problem Area'
            validate={[required]}
            options = {[
              {'display':'Conference', 'value':'conference'}
              , {'display': 'Student Position', 'value':'student_position'}
              , {'display': 'Scholarship', 'value':'scholarship'}
            ]}/>
        </div>

        {/*  Complaint Nature*/}
        <div>
            <Field name='complaint_nature'
              component={renderSelectField}
              type='select'
              validate={[required]}
              label='Complaint Nature'
              options = {[
                {'value': '', 'display': '-- Select the Complaint Type --'}
                , {'value': 'performance', 'display': 'Performance'}
                , {'value':'incorrect_data', 'display' : 'Incorrect Data'}
                , {'value': 'invalid_data_source', 'display': 'Invalid Information Source'}
              ]}>
            </Field>

        </div>


        <div>
            <Field
              component={renderTextArea}
              rows='10'
              cols='60'
              name='description'
              label='Description'
             validate={[required, minLength(20)]}/>
        </div>

        <div>
          <Field component='input' type='checkbox' name='registered_user' />
          <label>Registered User?</label>

        </div>

        {registered_user && (
          <div>
            <div>
              <Field name='profile_category'
              component={renderRadioGroup}
              label='User Type'
              options = {[
                {'display':'Student', 'value':'student'}
                , {'display': 'Professor', 'value':'professor'}
              ]}/>
            </div>

            <div>
              <Field name='website_source'
                component={renderSelectField}
                type='select'
                label='How did you learn about this website?'
                options = {[
                   {'value': 'ads', 'display': 'Ads'}
                  , {'value':'friend', 'display' : 'From a Friend'}
                  , {'value': 'google', 'display': 'Google Search'}
                ]}>
              </Field>
            </div>
      </div>)}

        <div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
    )

  }
}

SuggestionForm.defaultProps = {
  post_url: 'http://127.0.0.1:8000/main/api/suggestions',
}

const form_sync_validate = values =>{

  const errors = {}

  if(!values.problem_area){
    errors.problem_area = 'Required!'
  }

  return errors
}

SuggestionForm = ReactRouterDOM.withRouter(SuggestionForm)

var ConnectedSuggestionForm = ReduxForm.reduxForm({
  form:'suggestion',
  //validate: form_sync_validate
})(SuggestionForm)

// changing form based on the checkbox selections
const selector = ReduxForm.formValueSelector('suggestion')

ConnectedSuggestionForm = ReactRedux.connect(
  state =>{
    const registered_user = selector(state, 'registered_user')

    return {
      registered_user
    }
  }
)(ConnectedSuggestionForm)
