
// If no value, Required error is thrown
function required(value){
  return value ? undefined : "Required"
}

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

const minLength5 = minLength(5)
