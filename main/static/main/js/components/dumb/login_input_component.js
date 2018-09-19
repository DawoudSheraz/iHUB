
// props will contain url where the form will be posted
// as {%%} is Django specific expression and is not
// evaluated by the JS
function LoginComponent(props){

  let error_html;
  // In case of invalid Credentials, create a special HTML
  if(props.error){
      error_html = '<h3 style="color:red" > Invalid Credentials </h3>'
  }
  // Empty div, in case of initial page load
  else{
    error_html = '<div></div>'
  }

return(
    <div className="login-form">

      {/*  Error html*/}
        <div className="align_center" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(error_html)}} ></div>

    <form action={props.post_url} method="post">

        {/*  To render the csrf_token provided by Django */}
        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.token)}} ></div>

        <h2 className="text-center">Log In</h2>
        <div className="form-group">
            <input type="text" className="form-control" placeholder="Username/Email" name="username" required></input>
        </div>
        <div className="form-group">
            <input type="password" className="form-control" placeholder="Password" name="password" required></input>
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">Log in</button>
        </div>

        <div className="form-group">
            <span className="text-muted">Don't have an account! </span>
            <a  href={props.signup_url}>Sign Up</a>
        </div>
    </form>

</div>
);
}

LoginComponent.defaultProps = {
  error: false,
}
