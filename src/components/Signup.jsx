import React from "react";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username : '',
        email : '',
        password: ''
    };
  }

  handleInput = ({target : {name, value}}) => {
      this.setState({[name]: value})
  }

  handleSubmit= () => {
      let url = 'https://conduit.productionready.io/api/users';
      fetch(url, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'},
            body:JSON.stringify({user:this.state}),
        }).then(res => {
            if(res.status === 200) {
              this.props.history.push('/login'); 
            }
        })
  }

  render() {
      let {username, email, password} = this.state;
    return (
      <>
        <div className="signup_card">
          <h1>Sign Up</h1>
          <a className="primary_color" href="/login">
            Have an account?
          </a>
          <div className="flex flex2">        
            <input
              className="form_field"
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleInput}
              value={username}
            />
            <input
              className="form_field"
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleInput}
              value={email}
            
            />
            <input
              className="form_field"
              type="password"
              name="password"
              placeholder="*****"
              onChange={this.handleInput}
              value={password}
            
            />
            <input
              type="submit"
              value="Sign Up"
              className="primary primary_btn"
              onClick={this.handleSubmit}
            />
          </div>
        </div>
      </>
    );
  }
}
