import React from "react";
import Loading from "./Loading.jsx";

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      userArticle: null,
      // following : false
    };
  }

  componentDidMount() {
    let userId = this.props.match.params.profileSlug;
    let url = `https://conduit.productionready.io/api/profiles/${userId}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ profile }) => {
        console.log({profile}, "PROFILE");
        this.setState({ userInfo: profile });
        console.log(this.state.userInfo.following, "CDM");
      });
  }

  handleFollow = () => {
    var userId = this.props.match.params.profileSlug;
    let followUrl = `https://conduit.productionready.io/api/profiles/${userId}/follow`;
    fetch(followUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify({ profile: this.state.userInfo }),
    }).then((res) => {
      if (res.status === 200) {
        var userInfo = {...this.state.userInfo};
        userInfo.following = true;
        this.setState({userInfo});
        // this.setState({ ...this.state.userInfo, following: true });
      }
    });
  };

  handleUnfollow = () => {
    console.log("in unfollow");
    var userId = this.props.match.params.profileSlug;
    let followUrl = `https://conduit.productionready.io/api/profiles/${userId}/follow`;
    fetch(followUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify({ profile: this.state.userInfo }),
    }).then((res) => {
      if (res.status === 200) {
        var userInfo = {...this.state.userInfo};
        userInfo.following = false;
        this.setState({userInfo});
        // this.setState({ ...this.state.userInfo, following: false });
      }
    });
  };

  render() {
    let userId = this.props.match.params.profileSlug;
    let { userInfo } = this.state;
    return (
      <>
        {userInfo ? (
          <section>
            <h2>{userInfo.username}</h2>
            <h2>{userInfo.bio}</h2>
            <img className='user_image' src={userInfo.image} alt="img" />

            {/* {this.state.userInfo.following ? ( */}
            <button onClick={() => this.handleUnfollow(false)}>
              Unfollow {userId}
            </button>
             {/* ) : ( */}
            <button onClick={() => this.handleFollow(true)}>
              Follow {userId}
            </button>
             {/* )} */}
          </section>
        ) : (
          <Loading />
        )}
      </>
    );
  }
}
