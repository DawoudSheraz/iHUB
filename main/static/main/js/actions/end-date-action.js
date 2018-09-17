
const CHANGE_END_DATE = 'CHANGE_END_DATE'

// action created whenever the start date component changes
function update_end_date(end_date){

  return({
    type:CHANGE_END_DATE, end_date
  })
}
