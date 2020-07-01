import React from "react";

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo:null
    };
  }

  componentDidMount() {
    let profileSlug = this.props.match.params.profileSlug;
      let url = `https://conduit.productionready.io/api/articles/${profileSlug}`;
      fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        authorization: `Token ${localStorage.authToken}`,
      })
        .then((res) => res.json())
        .then((data) => this.setState({ article : data.article }));
        console.log(this.state.article, "EDIT");
    }
  

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    let url = "https://conduit.productionready.io/api/user";
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization:`Token ${localStorage.authToken}`
      },
      body: JSON.stringify({ user: this.state.userInfo }),
    }).then((res) => {
      if (res.status === 200) {
        this.props.history.push("/");
      }
    });
  };

  render() {
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
