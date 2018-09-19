
function renderTextArea ({ input, label,rows, cols, meta: { touched, error, warning } }){
  return(
  <div>
    <label>{label}</label>
    <div className='form-group'>
      <textarea  {...input} rows={rows} cols={cols} className="form-control" placeholder={label}  />
      {touched && ((error && <span className='error-style'>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)
}
