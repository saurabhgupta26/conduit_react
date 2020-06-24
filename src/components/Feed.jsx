import React from "react";

function Feed(props) {
  return (
    <div className="feeds_nav">
          <>
          <div className="flex flex1">
            <a href="#"><h3 className='feed_btn'>Your Feed</h3></a>
            <a href="#"><h3 className="feed_btn active_feed">Global Feed</h3></a>
            </div>
          </>
    </div>
  );
}
export default Feed;
