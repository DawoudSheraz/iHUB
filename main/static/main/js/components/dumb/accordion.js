
function Accordion(props){
  const accordion_id = props.accordion_id + '_accordion'
  const panel_list = props.options

  let accordion_panel_list = []

  panel_list.forEach((current,index) =>{
    accordion_panel_list.push(
      <AccordionPanel
        body_id={props.accordion_id + index}
        label={current['label']}
        data_parent={'#'+ accordion_id}
        key={index}>
        {current['data']}
      </AccordionPanel>
    )
  })
  return(

    <div className="container-fluid">
      <div className="panel-group" id={accordion_id}>
        {accordion_panel_list}
      </div>
    </div>

  )

}
