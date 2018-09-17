
const CHANGE_START_DATE = 'CHANGE_START_DATE'

// action created whenever the start date component changes
function update_start_date(start_date){

  return({
    type:CHANGE_START_DATE, start_date
  })
}
