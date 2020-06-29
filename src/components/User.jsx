import React from "react";
import Loading from "./Loading.jsx";

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      userArticle: null,
    };
  }

  componentDidMount() {
    let userId = this.props.match.params.profileSlug;
    let url = `https://conduit.productionready.io/api/profiles/{userId}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ user }) => {
        this.setState({ userInfo: user });
        console.log(this.state.userInfo, "user info");
      });
  }

  render() {
    return (
      <>
        {this.state.userInfo ? (
          <section>
            <h2>{this.state.userInfo.username}</h2>
            <h2>{this.state.userInfo.bio}</h2>
            <img src={this.state.userInfo.image} alt="img" />
            <button>
              {this.state.userInfo.following ? "Unfollow" : "Follow"}
            </button>
          </section>
        ) : (
          <Loading />
        )}
      </>
    );
  }
}
