import React from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading.jsx";
import { withRouter } from "react-router-dom";

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleData: null,
      commentData: null,
      body: "",
    };
  }

  componentDidMount() {
    let articleId = this.props.match.params.slug;
    let url = `https://conduit.productionready.io/api/articles/${articleId}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ article }) => {
        this.setState({ articleData: article });
        console.log(this.state.articleData, "full article");
      });
    let urlComment = `https://conduit.productionready.io/api/articles/${articleId}/comments`;
    fetch(urlComment, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ comments }) => {
        this.setState({ commentData: comments });
        console.log(this.state.commentData, "comment");
      });
  }

  handleDelete = () => {
    let articleId = this.props.match.params.slug;
    let url = `https://conduit.productionready.io/api/articles/${articleId}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        this.props.history.push("/");
      }
    });
  };

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    let articleId = this.props.match.params.slug;
    let url = `https://conduit.productionready.io/api/articles/${articleId}/comments`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify({ body: this.state.body }),
    }).then((res) => {
      if (res.status === 200) {
        this.props.history.push(`/articles/${articleId}`);
      }
    });
  };

  render() {
    let { body } = this.state;
    return (
      <>
        {this.state.articleData ? (
          <section>
            <h2>{this.state.articleData.title}</h2>
            <Link
              className="article_author"
              to={`/profile/${this.state.articleData.author.username}`}
            >
              <img
                className="user_image"
                src={this.state.articleData.author.image}
                alt="img"
              />
              <h2>{this.state.articleData.author.username}</h2>
              <p>{this.state.articleData.createdAt}</p>
            </Link>

            {this.props.userInfo &&
            this.state.articleData.author.username ===
              this.props.userInfo.username ? (
              <>
                <Link to={`/articles/${this.props.match.params.slug}/edit`}>
                  Edit Article
                </Link>
                <Link onClick={this.handleDelete}>Delete Article</Link>
              </>
            ) : (
              <> </>
            )}

            <p>{this.state.articleData.body}</p>
            <h1>{this.state.articleData.tagList}</h1>
          </section>
        ) : (
          <Loading />
        )}
        {this.state.commentData ? (
          this.state.commentData.map((elem) => {
            return (
              <>
                <h2> {elem.body} </h2>
                <p>{elem.createdAt.split("T", [1])}</p>
              </>
            );
          })
        ) : (
          <Loading />
        )}

        {this.props.userInfo ? (
          <div className="comment_card">
            <input
              type="text"
              name="body"
              onChange={this.handleInput}
              placeholder="Write a comment..."
              value={body}
              className="comment_field"
            />
            <input
              type="submit"
              value="Post Comment"
              className="primary primary_btn"
              onClick={this.handleSubmit}
            />
          </div>
        ) : (
          <> </>
        )}

        {!this.props.userInfo ? (
          <h4>
            <a href="/login" className="primary_color">
              Sign in
            </a>
            or
            <a href="/signup" className="primary_color">
              sign up
            </a>
            to add comments on this article.
          </h4>
        ) : (
          <></>
        )}
      </>
    );
  }
}
export default withRouter(Article);
