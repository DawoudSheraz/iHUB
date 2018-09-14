
function App(props){

  return(
    <div>
      <HeaderComponent />
      <AppBody app_data = {props.app_data}/>
    </div>
  )
}
