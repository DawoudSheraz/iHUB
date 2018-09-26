
function Accordian(props){
  const accordian_id = props.accordian_id + '_accordian'
  const panel_list = props.options

  let accordian_panel_list = []

  panel_list.forEach((current,index) =>{
    accordian_panel_list.push(
      <AccordianPanel
        body_id={props.accordian_id + index}
        label={current['label']}
        data_parent={'#'+ accordian_id}
        key={index}>
        {current['data']}
      </AccordianPanel>
    )
  })
  return(

    <div className="container-fluid">
      <div className="panel-group" id={accordian_id}>
        {accordian_panel_list}
      </div>
    </div>

  )

}
