
// render select field with errors
function renderSelectField({ input, label, options, type, meta: { touched, error } }){
  return(
  <div>
    {/*  Label */}
    <label>{label} &nbsp;</label>
    {touched && (error && <span className='error-style'>{error}</span>)}
    <div className='form-group'>
    {/*  For reach value in options array, create option tag*/}
      <select {...input} className='form-control select-style'>
        {options.map( current => (<option value={current.value} key={current.value}>{current.display}</option>) )}
      </select>

    </div>
  </div>
)
}
