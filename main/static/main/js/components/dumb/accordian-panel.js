

// Component for creating a collapsable panel inside an accordian
function AccordianPanel(props){

  return(
    <div className="panel panel-default">
      <div className="panel-heading">
        <h4 className="panel-title">
          <a data-toggle="collapse" data-parent={props.data_parent} href={"#" + props.body_id}>
            {props.label}
          </a>
        </h4>
      </div>
      <div id={props.body_id} className="panel-collapse collapse">
        <div className="panel-body">

            {props.children}

        </div>
      </div>
    </div>
  )
}
