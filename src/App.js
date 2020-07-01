import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Wholepage from "./components/Wholepage.jsx";
import Header from "./components/Header.jsx";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import Error from "./components/Error.jsx";
import Loading from "./components/Loading.jsx";
import Article from "./components/Article.jsx";
import CreateArticle from "./components/CreateArticle.jsx";
import User from "./components/User.jsx";
import EditArticle from "./components/EditArticle.jsx";
import Setting from "./components/Setting.jsx";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      tags: null,
      isLoggedIn: localStorage.getItem("authToken") ? true : false,
      userInfo: null,
    };
  }

  componentDidMount() {
    if (localStorage.authToken) {
      let url = "https://conduit.productionready.io/api/user";
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${localStorage.authToken}`,
        },
      })
        .then((res) => res.json())
        .then(({ user }) => {
          this.setState({ isLoggedIn: true, userInfo: user });
        })
        .catch((err) => this.setState({ isLoggedIn: false }));
    }

    fetch(`https://conduit.productionready.io/api/articles?limit=10&offset=0`)
      .then((response) => response.json())
      .then((data) => this.setState({ articles: data.articles }));

    fetch(`https://conduit.productionready.io/api/tags`)
      .then((response) => response.json())
      .then((data) => this.setState({ tags: data.tags }));
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

  updateLoggedIn = (status) => {
    this.setState({ isLoggedIn: status });
  };

  render() {
    let { isLoggedIn, userInfo } = this.state;
    console.log(this.state.articles);
    // if (!isLoggedIn) {
    //   return <Loading />;
    // }

    return (
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} userInfo={userInfo} />
        <Switch>
          <Route
            render={() => (
              <Wholepage
                articles={this.state.articles}
                tags={this.state.tags}
                handleClick={this.handleClick}
                handleGlobal={this.handleGlobal}
                userInfo={this.state.userInfo}
              />
            )}
            path="/"
            exact
          />
          <Route
            render={() => <Signin updateLoggedIn={this.updateLoggedIn} />}
            path="/login"
            exact
          />
          <Route component={EditArticle} path="/articles/:slug/edit" />
          <Route component={User} path="/profile/:profileSlug" />
          <Route
            render={() => (
              <Article userInfo = {this.state.userInfo} />
            )}
            path="/articles/:slug"
          />
          <Route component={Setting} path="/setting" />
          <Route component={Signup} path="/signup" />
          <Route component={CreateArticle} path="/create" />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}
