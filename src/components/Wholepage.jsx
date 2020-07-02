import React from "react";
import Articles from "./Articles";
import Tags from "./Tags.jsx";
import Feed from "./Feed.jsx";
import Loading from "./Loading.jsx";
import { withRouter } from 'react-router-dom';

function Wholepage(props) {
  return (
    <>
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
                <Articles articles={props.articles}
                 handleFavourite = {props.handleFavourite}
                 handleUnfavourite = {props.handleUnfavourite} />
              </div>
            ) : (
              <Loading />
            )}
          </div>
          {props.tags ? (
            <div className="tags_flex_card">
              <Tags tags={props.tags} handleClick = {props.handleClick} />
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}
export default withRouter(Wholepage);
