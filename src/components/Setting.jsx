import React from "react";
import Loading from "./Loading.jsx";
import { withRouter } from 'react-router-dom';

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
    };
  }

  componentDidMount() {
    if (localStorage.authToken) {
      // let profileSlug = this.props.match.params.profileSlug;
      let url = "https://conduit.productionready.io/api/user";
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${localStorage.authToken}`,
        },
      })
        .then((res) => res.json())
        .then((user) => this.setState({ userInfo: user.user }))
        .catch((err) => this.setState({ userInfo: null }));

      console.log(this.state.userInfo, "EDIT");
    }
  }

  handleInput = ({ target: { name, value } }) => {
    if (this.state.userInfo) {
      let userInfo = this.state.userInfo;
      userInfo[name] = value;
      this.setState({ userInfo });
    }
  };

  handleSubmit = () => {
    let url = "https://conduit.productionready.io/api/user";
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify({ user: this.state.userInfo }),
    }).then((res) => {
      if (res.status === 200) {
        this.props.history.push("/");
      }
    });
  };

  render() {
    if (!this.state.userInfo) {
      return <Loading />;
    }
    let { image, username, bio, email, password } = this.state.userInfo;
    return (
      <>
        <div className="signup_card">
          <h1>Your Settings</h1>
          <div className="flex flex2">
            <input
              className="form_field"
              type="text"
              name="image"
              placeholder="Image URL"
              onChange={this.handleInput}
              value={image}
            />
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
              type="text"
              name="bio"
              placeholder="Short bio about you"
              onChange={this.handleInput}
              value={bio}
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
              value="Update Settings"
              className="primary primary_btn"
              onClick={this.handleSubmit}
            />
          </div>
        <hr/>
        <button onClick={this.props.handleLogout} className='primary logout' >Or click here to logout.</button>
        </div>
      </>
    );
  }
}

export default withRouter(Setting);