
// A form field template to show error and stuff
// Taken from : https://codesandbox.io/s/pQj03w7Y6 (Official Docs)

function renderField ({ input, label, type, meta: { touched, error, warning } }){
  return(
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)
}
