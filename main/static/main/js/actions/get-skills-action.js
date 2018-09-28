
const GET_SKILLS = 'GET_SKILLS'

// action dispatched
function get_skills(skills){
  return(
    {
      type: GET_SKILLS, skills
    }
  )
}

// main function to be called to get the skill data
function request_skills(request_url, dispatch){

  axios.get(request_url)
  .then(function (response){
    dispatch(get_skills(response.data))
  })
  .catch(function (error){
    dispatch(get_skills(['python', 'django']))
  })
}
