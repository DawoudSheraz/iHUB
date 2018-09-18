
// render select field with errors
function renderSelectField({ input, label, options, type, meta: { touched, error } }){
  return(
  <div>
    {/*  Label */}
    <label>{label}</label>

    <div>
    {/*  For reach value in options array, create option tag*/}
      <select {...input}>
        {options.map( current => (<option value={current.value} key={current.value}>{current.display}</option>) )}
      </select>
      {touched && (error && <span>{error}</span>)}
    </div>
  </div>
)
}
