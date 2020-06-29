import React from "react";
import {Link} from 'react-router-dom';

function Articles(props) {
  console.log("in everything");
  return (
    <>
      {props.articles.map((elem, i) => {
        return (
          <section className="article_top" key={i}>
            <div className="flex">
              <div className="flex">
                <img src={elem.author.image} className="author_img" alt="img" />
                <div className="article_author">
                  <span className="author">{elem.author.username}</span>
                  <span className="article_date">
                    {elem.createdAt.split("T")[0]}
                  </span>
                </div>
              </div>
              <button className="favorite_count" key={i}>
                <i class="fas fa-heart"></i>
                {elem.favoritesCount}
              </button>
            </div>
            <h4 className="article_title"> {elem.title} </h4>
            <h5 className="article_description padding">{elem.description}</h5>
            <Link to={`articles/${elem.slug}`}>Read more...</Link>
          </section>
        );
      })}
    </>
  );
}
export default Articles;
