
// A form field template to show error and stuff
// Taken from : https://codesandbox.io/s/pQj03w7Y6 (Official Docs)

function renderField ({ input, label, type, meta: { touched, error, warning } }){
  return(
  <div>
    <label>{label}</label>
    <div className='form-group'>
      <input   type={type} {...input} className="form-control" placeholder={label}  />
      {touched && ((error && <span className='error-style'>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)
}
