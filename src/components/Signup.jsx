import React from "react";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username : '',
        name : '',
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
        })
  }

  render() {
    return (
      <>
        <div className="signup_card">
          <h1>Sign Up</h1>
          <a className="primary_color" href="/login">
            Have an account?
          </a>
          <form action="" className="flex flex2">
            <input
              className="form_field"
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleInput}
            />
            <input
              className="form_field"
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleInput}
            />
            <input
              className="form_field"
              type="password"
              name="password"
              placeholder="*****"
              onChange={this.handleInput}
            />
            <input
              type="submit"
              value="Sign Up"
              className="primary primary_btn"
              onClick={this.handleSubmit}
            />
          </form>
        </div>
      </>
    );
  }
}
