
// Custom Pagination for easy navigation among the component
class Pagination extends React.Component{

  constructor(props){
    super(props);
    this.checkInput = this.checkInput.bind(this);
    this.sendButtonUrlToParent = this.sendButtonUrlToParent.bind(this)
  }

  // url/button that is clickable
  get_active_li_item(href_link, text){
    return(
      <li className="page-item">
        <a className="page-link" href={href_link} onClick={this.sendButtonUrlToParent}>{text}</a>
      </li>
    )
  }

// Disabled buttons e.g. next button on last page
  get_disable_li_item(text){
    return(
    <li className="page-item disabled">
      <span className="page-link">{text}</span>
    </li>
  )
  }

  sendButtonUrlToParent(e){
    // Stop the re-direction by <a> tag
    e.preventDefault();
    this.props.NewRequestUrl(e.target.href)

  }

  // The input should remain between the min and max
  checkInput(e){
    let out_val = e.target.value;

    if(out_val < parseInt(e.target.min)){
      out_val = e.target.min
    }
    if(out_val > parseInt(e.target.max)){
      out_val = e.target.max
    }
    out_val = this.props.base_url + '?page=' + out_val
    this.props.NewRequestUrl(out_val)

  }

  render(){
    // Buttons whose state is decided based on the current page number
    let prev_button, next_button, first_button, last_button;

    let max_page = this.props.pagination_data['pages']
    let current = this.props.pagination_data['current_page']
    let base_url = this.props.base_url

    // On the first page
    if(this.props.pagination_data['previous']==null){
      first_button = this.get_disable_li_item('First')
      prev_button = this.get_disable_li_item('Previous')
    }
    else{
      first_button = this.get_active_li_item(base_url + '?page=1', 'First')
      prev_button = this.get_active_li_item(base_url + '?page='+ (current - 1), 'Previous')
    }

    // On the Last  page
    if(this.props.pagination_data['next']==null){
      next_button = this.get_disable_li_item('Next')
      last_button = this.get_disable_li_item('Last')
    }
    else{
      next_button = this.get_active_li_item(base_url + '?page='+ (current + 1), 'Next')
      last_button = this.get_active_li_item(base_url + '?page='+ (max_page), 'Last')
    }

    return(
      <nav aria-label="pagination" className="mb-4">
        <ul className="pagination">
          {first_button}
          {prev_button}

          <li className="page-item">
            <span>Page <input type='number' value={current} onChange={this.checkInput}  min='1' max={max_page}></input> of {max_page}</span>
          </li>

          {next_button}
          {last_button}
        </ul>
      </nav>

    )

  }
}

Pagination.defaultProps = {
  base_url: '',
  NewRequestUrl: () => null,

}
