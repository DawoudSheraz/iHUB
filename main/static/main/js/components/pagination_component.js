
// Custom Pagination for easy navigation among the component
class Pagination extends React.Component{

  constructor(props){
    super(props);
  }

  get_active_li_item(href_link, text){
    return(
      <li className="page-item">
        <a className="page-link" href={href_link}>{text}</a>
      </li>
    )
  }

  get_disable_li_item(text){
    return(
    <li className="page-item disabled">
      <span className="page-link">{text}</span>
    </li>
  )
  }

  render(){

    let prev_button, next_button, first_button, last_button;
    // On the first page
    if(this.props.previous==null){
      first_button = this.get_disable_li_item('First')
      prev_button = this.get_disable_li_item('Previous')
    }
    else{
      first_button = this.get_active_li_item('', 'First')
      prev_button = this.get_active_li_item('#', 'Previous')
    }

    // On the Last  page
    if(this.props.next==null){
      next_button = this.get_disable_li_item('Next')
      last_button = this.get_disable_li_item('Last')
    }
    else{
      next_button = this.get_active_li_item('', 'Next')
      last_button = this.get_active_li_item('#', 'Last')
    }

    return(
      <nav aria-label="pagination" className="mb-4">
        <ul className="pagination">
          {first_button}
          {prev_button}

          <li className="page-item">
            <span className="page-link">Page <input type='number' min='1' max='4'></input> of 4</span>
          </li>

          {next_button}
          {last_button}
        </ul>
      </nav>

    )

  }
}
