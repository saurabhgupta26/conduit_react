import React from "react";

export default class CreateArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tagsList: '',
    };
  }
  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  handleSubmit = () => {
    let url = "https://conduit.productionready.io/api/articles";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify({ articleData: this.state }),
    }).then((res) => {
      if (res.status === 200) {
        this.props.history.push("/");
      }
    });
  };
  render() {
    let { title, description, body, tagsList } = this.state;
    return (
      <>
        <div className="create_card">
          <input
            type="text"
            name="title"
            className="form_field"
            placeholder="Article Title"
            onChange={this.handleInput}
            value={title}
          />
          <input
            type="text"
            name="description"
            className="form_field"
            placeholder="What's this article about?"
            onChange={this.handleInput}
            value={description}
          />
          <input
            type="text"
            name="body"
            className="form_field"
            placeholder="Write your Article"
            onChange={this.handleInput}
            value={body}
          />
          <input
            type="text"
            name="tagsList"
            className="form_field"
            placeholder="Enter Tags"
            onChange={this.handleInput}
            value={tagsList}
          />
          <input
            type="submit"
            value="Publish"
            className="primary primary_btn"
            onClick={this.handleSubmit}
          />
        </div>
      </>
    );
  }
}