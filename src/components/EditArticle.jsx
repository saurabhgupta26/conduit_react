import React from "react";
import Loading from './Loading.jsx';

export default class EditArticle extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      article: null,
      slug: props.match.params.slug
    };
  }

  componentDidMount() {
      let {slug} = this.state;
      let url = `https://conduit.productionready.io/api/articles/${slug}`;
      fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        authorization: `Token ${localStorage.authToken}`,
      })
        .then((res) => res.json())
        .then((data) => this.setState({ article : data.article }));
        
        console.log(this.state.article, "EDIT");
    }

  handleInput = ({ target: { name, value } }) => {
      if(this.state.article) {
          let article = this.state.article;
          if(name !== 'tagList') {
              article[name] = value;
              this.setState({article});
          } else {
              value = value.split(",").map((tag) => tag.trim());
              article[name] = value;
              this.setState({article});
          }
      }
  };


  handleSubmit = () => {
    let url = `https://conduit.productionready.io/api/articles/${this.state.slug}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify({ article : this.state.article }),
    }).then((res) => {
      if (res.status === 200) {
        this.props.history.push(`/articles/${this.state.slug}`);
      }
    });
  };
  render() {
      if(!this.state.article) {
          return <Loading />
      }
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
          <textarea
            rows='10'
            cols='55'
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