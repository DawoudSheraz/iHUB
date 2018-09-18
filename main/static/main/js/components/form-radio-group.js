
// To render RadioGroup
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
