import React from "react";

function Tags(props) {
  return (
    <div className="tags_card">
      <h4>Popular Tags</h4>
      {props.tags.map((elem, i) => {
        console.log(elem, "NEWS");
        return (
          <>
            <button className="btn_tags" key={i}>
              {elem}
            </button>
          </>
        );
      })}
    </div>
  );
}
export default Tags;
