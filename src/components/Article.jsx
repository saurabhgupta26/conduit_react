import React from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading.jsx";

export default class Article extends React.Component {
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
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
    .then(({comment}) => {
      this.setState({commentData : comment});
      console.log(this.state.commentData, "comment");
    })
  }

  render() {
    return (
      <>
        {this.state.articleData ? (
          <section>
            <h2>{this.state.articleData.title}</h2>
            <img src={this.state.articleData.author.image} alt="img" />
            <h2>{this.state.articleData.author.username}</h2>
            <p>{this.state.articleData.createdAt}</p>
            <p>{this.state.articleData.body}</p>
            <h1>{this.state.articleData.tagList}</h1>
          </section>
        ) : (
          <Loading />
        )}
        {this.state.commentData ? (
          <section> 
            <h2>
            {this.state.commentData.body}
            </h2>
              <p> {this.state.commentData.createdAt} </p>
          </section> ) : ( <Loading />)}
      </>
    );
  }
}