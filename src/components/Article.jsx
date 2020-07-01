import React from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading.jsx";
import { withRouter } from 'react-router-dom';

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleData: null,
      commentData: null,
    };
  }

  componentDidMount() {
    let articleId = this.props.match.params.slug;
    let url = `https://conduit.productionready.io/api/articles/${articleId}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
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

  render() {
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
            {this.state.articleData.author.username ===
            this.props.userInfo.username ?
            <>
            <Link to={`/articles/${this.props.match.params.slug}/edit`}>
              Edit Article
            </Link>
            <Link onClick={this.handleDelete}>Delete Article</Link>
            </>
            :
            <div> 
            </div>
            }
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
      </>
    );
  }
}


export default withRouter(Article);