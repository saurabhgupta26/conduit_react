import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleFavourite = (slug, e) => {
    let articleId = slug;
    e.target.classList.add("unfavorite");
    console.log(articleId, "POOl");
    let url = `https://conduit.productionready.io/api/articles/${articleId}/favorite`
    fetch(url, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:`Token ${localStorage.authToken}`
      }
    }).then((res) => {
      if(res.status=== 200) {
        let articles = {...this.state.articles};
        articles.favorited = true;
        this.setState({articles});
      }
    });
  };
  handleUnfavourite = (slug, e) => {
    let articleId = slug;
    if(e.target.classList.contains("unfavorite"))
    e.target.classList.remove("unfavorite");
    let url = `https://conduit.productionready.io/api/articles/${articleId}/favorite`
    fetch(url, {
      method:'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization:`Token ${localStorage.authToken}`
      }
    }).then((res) => {
      if(res.status=== 200) {
        let articles = {...this.state.articles};
        articles.favorited = false;
        this.setState({articles});

      }
    });
  }

// CHECK THE ABOVE FETCH BEFORE START

  render() {
    return (
      <>
        {this.props.articles.map((elem, i) => {
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
                    to={`profile/${elem.author.username}`}
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
                  onClick={(e) => this.handleFavourite(elem.slug, e)}
                  key={i}
                >
                  <i class="fas fa-heart"></i>
                  {elem.favoritesCount}
                </button>) : (
                  <button
                  className="favorite_count"
                  onClick={(e) => this.handleUnfavourite(elem.slug, e)}
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
              <Link to={`articles/${elem.slug}`}>Read more...</Link>
            </section>
          );
        })}
      </>
    );
  }
}

export default withRouter(Articles);