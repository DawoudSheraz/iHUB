
// To render RadioGroup
// set type explicitly in the function; don't rely on type param
function renderRadioGroup({ input, label ,options, type, meta: { touched, error } }){

  return(
    <div>
        <label>{label} &nbsp;</label>
        {touched && (error && <span className='error-style'>{error}</span>)}
        {options.map(current => (
          <div key={current.value}>
            <label className='radio-style'>

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
