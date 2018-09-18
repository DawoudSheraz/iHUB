
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

// render select field with errors
function renderSelectField({ input, label, options, type, meta: { touched, error } }){
  return(
  <div>
    {/*  Label */}
    <label>{label}</label>

    {/*  For reach value in options array, create option tag*/}
      <select {...input}>
        {options.map( current => (<option value={current.value} key={current.value}>{current.display}</option>) )}
      </select>
      {touched && (error && <span>{error}</span>)}
  </div>
)
}
