
// convert list into a styled tagged list
function TaggedList(props){

  const data_list = props.data_list
  return(
    <ul>
      {data_list.map((current) => (
        <li key={current} >
          <span className='customTag'>{current}</span>
        </li>
      ))}
    </ul>
)
}
