
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

// To render RagioGroup
// set type explicitly in the function; don't rely on type param
function renderRadioGroup({ input, label ,options, type, meta: { touched, error } }){

  return(
    <div>
        <label>{label}</label>
        {touched && (error && <span>{error}</span>)}
        {options.map(current => (
          <div key={current.value}>
            <label>
              <input

                type='radio'
                {...input}
                value={current.value}
                checked={current.value == input.value}
                onClick={value => {input.onChange(value);}}
                />
                {current.display}
            </label>

          </div>
        ))}

    </div>

  )
}
