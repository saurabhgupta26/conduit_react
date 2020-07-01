import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';

class Articles extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFavourite = () => {
    let articleId = this.props.match.params.slug;
    let url = `https://conduit.productionready.io/api/articles/${articleId}/favorite`
    fetch(url, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:`Token ${localStorage.authToken}`
      }
    })
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
                <button
                  className="favorite_count"
                  // onClick={this.handleFavourite}
                  key={i}
                >
                  <i class="fas fa-heart"></i>
                  {elem.favoritesCount}
                </button>
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