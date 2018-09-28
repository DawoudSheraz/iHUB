

export default function get_skills(state, action){

  if (typeof state == 'undefined'){
    return {'skills' : ['python', 'django']}
  }

  switch (action.type) {

    case 'GET_SKILLS':
      return Object.assign({}, state, {skills : action.skills})
      break;

    default:
      return state

  }
}
