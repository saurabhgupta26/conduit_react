import React from "react";
import Loading from "./Loading.jsx";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      userArticles: null,
      // favArticles: null,
      // following : false
    };
  }

  componentDidMount() {
    let userId = this.props.match.params.profileSlug;
    let url = `https://conduit.productionready.io/api/profiles/${userId}`;
    let myArticleUrl = `https://conduit.productionready.io/api/articles?author=${userId}&limit=5&offset=0`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ profile }) => {
        this.setState({ userInfo: profile });
      });
    fetch(myArticleUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      authorization: `Token ${localStorage.authToken}`,
    })
      .then((res) => res.json())
      .then(({ articles }) => {
        this.setState({ userArticles: articles });
      });
  }

  myArticles = () => {
    let userId = this.props.match.params.profileSlug;
    let myArticleUrl = `https://conduit.productionready.io/api/articles?author=${userId}&limit=5&offset=0`;
    fetch(myArticleUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      authorization: `Token ${localStorage.authToken}`,
    })
      .then((res) => res.json())
      .then(({ articles }) => {
        this.setState({ userArticles: articles });
      });
  };

  favArticles = () => {
    let userId = this.props.match.params.profileSlug;
    let url = `https://conduit.productionready.io/api/articles?favorited=${userId}&limit=5&offset=0`;
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      authorization: `Token ${localStorage.authToken}`,
    })
      .then((res) => res.json())
      .then(({ articles }) => {
        this.setState({ userArticles: articles });
      });
  };

  handleFollow = () => {
    let userId = this.props.match.params.profileSlug;
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
        var userInfo = { ...this.state.userInfo };
        userInfo.following = true;
        this.setState({ userInfo });
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
        var userInfo = { ...this.state.userInfo };
        userInfo.following = false;
        this.setState({ userInfo });
      }
    });
  };

  render() {
    let userId = this.props.match.params.profileSlug;
    let { userInfo, userArticles } = this.state;
    return (
      <>
        {userInfo ? (
          <section>
            <h2>{userInfo.username}</h2>
            <h2>{userInfo.bio}</h2>
            <img className="user_image" src={userInfo.image} alt="img" />

            {this.state.userInfo.following ? (
              <button onClick={() => this.handleUnfollow(false)}>
                Unfollow {userId}
              </button>
            ) : (
              <button onClick={() => this.handleFollow(true)}>
                Follow {userId}
              </button>
            )}
            <button
              onClick={this.myArticles}
              activeClassName="active_feed"
              className="feed_btn"
            >
              My Articles
            </button>
            <button
              onClick={this.favArticles}
              activeClassName="active_feed"
              className="feed_btn"
            >
              Favorited Articles
            </button>
          </section>
        ) : (
          <Loading />
        )}

        {userArticles && userArticles ? (
          <>
            <div className="all_articles">
              {this.state.userArticles.map((elem, i) => {
                return (
                  <section className="article_top" key={i}>
                    <div className="flex">
                      <div className="flex">
                        <img
                          src={elem.author.image}
                          className="author_img"
                          alt="img"
                        />
                        <Link
                          className="article_author"
                          to={`/profile/${elem.author.username}`}
                        >
                          <span className="author">{elem.author.username}</span>
                          <span className="article_date">
                            {elem.createdAt.split("T")[0]}
                          </span>
                        </Link>
                      </div>
                      {console.log(elem.favorited, "HERE is ")}
                      {!elem.favorited ? (
                        <button
                          className="favorite_count"
                          onClick={(e) =>
                            this.props.handleFavourite(elem.slug, e)
                          }
                          key={i}
                        >
                          <i class="fas fa-heart"></i>
                          {elem.favoritesCount}
                        </button>
                      ) : (
                        <button
                          className="favorite_count"
                          onClick={(e) =>
                            this.props.handleUnfavourite(elem.slug, e)
                          }
                          key={i}
                        >
                          <i class="fas fa-heart"></i>
                          {elem.favoritesCount}
                        </button>
                      )}
                    </div>
                    <h4 className="article_title"> {elem.title} </h4>
                    <h5 className="article_description padding">
                      {elem.description}
                    </h5>
                    <Link to={`/articles/${elem.slug}`}>Read more...</Link>
                  </section>
                );
              })}
            </div>
          </>
        ) : (
          <Loading />
        )}
      </>
    );
  }
}

export default withRouter(User);
