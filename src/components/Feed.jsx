import React from "react";

function Feed(props) {
  return (
    <div className="feeds_nav">
      <>
        <div className="flex flex1">
          
          {props.userInfo ? (
            <button onClick={props.handleFeed} className="feed_btn">
              Your Feed
            </button>
          ) : (
            <> </>
          )}
          <button onClick={props.handleGlobal} className="feed_btn active_feed">
            Global Feed
          </button>
        </div>
      </>
    </div>
  );
}
export default Feed;
