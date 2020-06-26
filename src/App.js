import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Wholepage from "./components/Wholepage.jsx";
import Header from "./components/Header.jsx";
import Login from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import Error from './components/Error.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      tags: null,
    };
  }

  componentDidMount() {
    fetch(`https://conduit.productionready.io/api/articles?limit=10&offset=0`)
      .then((response) => response.json())
      .then((data) => this.setState({ articles: data.articles }));
    console.log("articles: ", this.state.articles);

    fetch(`https://conduit.productionready.io/api/tags`)
      .then((response) => response.json())
      .then((data) => this.setState({ tags: data.tags }));
    console.log("tags: ", this.state.tags);
  }

  handleClick = (tag) => {
    fetch(
      `https://conduit.productionready.io/api/articles?tag=${tag}&limit=10&offset=0`
    )
      .then((response) => response.json())
      .then((data) => this.setState({ articles: data.articles }));
    console.log("articles: ", this.state.articles);
  };
  handleGlobal = () => {
    fetch(`https://conduit.productionready.io/api/articles?limit=10&offset=0`)
      .then((response) => response.json())
      .then((data) => this.setState({ articles: data.articles }));
  };

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route
            render={() => (
              <Wholepage
                articles={this.state.articles}
                tags={this.state.tags}
                handleClick={this.handleClick}
                handleGlobal={this.handleGlobal}
              />
            )}
            path="/"
            exact
          />
          <Route component={Login} path="/login" exact />
          <Route component={Signup} path="/signup" exact />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}
