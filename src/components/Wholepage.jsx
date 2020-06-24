import React from "react";
import Articles from "./Articles";
import Tags from "./Tags.jsx";
import Feed from "./Feed.jsx";
import Loading from "./Loading.jsx";

function Wholepage(props) {
  return (
    <>
      <div className="container">
        <div className="flex">
          <div className="logo">
            <h3>conduit</h3>
          </div>
          <ul className="nav_bar flex">
            <a href="#">
              <li>Home</li>
            </a>
            <a href="#">
              <li>Sign In</li>
            </a>
            <a href="#">
              <li>Sign Up</li>
            </a>
          </ul>
        </div>
      </div>

      <div className="container1">
        <section className="hero_section">
          <h1>conduit</h1>
          <p>A place to share your knowledge.</p>
        </section>
      </div>

      <div className="container">
        <div className="flex">
          <div className="feed_block articles_flex_card">
              <Feed />
            {props.articles ? (
              <div>
                <Articles articles={props.articles} />
              </div>
            ) : (
              <Loading />
            )}
          </div>
          {props.tags ? (
            <div className="tags_flex_card">
              <Tags tags={props.tags} />
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}
export default Wholepage;
