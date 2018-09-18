
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

        <div>
          <label htmlFor='fullName'>Name</label>
          <div>
            <Field name='fullName' component='input' type='text' placeholder='Name'/>
          </div>
        </div>

        <div>
          <label htmlFor='email'>Email</label>
          <div>
            <Field name='email' component='input' type='email' placeholder='Email'/>
          </div>
        </div>

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
        <button type="submit">Submit</button>
      </form>
    )

  }
}

var ConnectedSuggestionForm = ReduxForm.reduxForm({
  form:'suggestion'
})(SuggestionForm)
