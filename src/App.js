import React from "react";
import Wholepage from "./components/Wholepage.jsx";

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: null,
      tags: null,
    };
  }

  componentDidMount() {
    fetch(`https://conduit.productionready.io/api/articles?limit=10&offset=0`)    
      .then((response) => response.json())
      .then((data) => this.setState({ articles:data.articles }));
    console.log("articles: ", this.state.articles);
    
    fetch(`https://conduit.productionready.io/api/tags`)
      .then((response) => response.json())
      .then((data) => this.setState({ tags: data.tags }));
    console.log("tags: ", this.state.tags);
  }

render() {
    // console.log(this.state, 'inside render')
    return (
      <>
        <Wholepage
          articles = {this.state.articles}
          tags = {this.state.tags}
        />
      </>
    );
  }
}