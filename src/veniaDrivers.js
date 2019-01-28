import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { Query as ApolloQuery } from "react-apollo";

const client = new ApolloClient({
  uri: "/graphql"
});

// redux is a no-op
export function connect() {
  return Cmp => Cmp;
}

export class Query extends Component {
  render() {
    return <ApolloQuery client={client} {...this.props} />;
  }
}

export class Link extends Component {
  render() {
    const { children, to, ...rest } = this.props;
    return (
      <a {...rest} href={to}>
        {children}
      </a>
    );
  }
}
export class ResourceUrl {
  constructor(url) {
    try {
      this.url = new window.URL(url);
    } catch (e) {
      this.url = new window.URL(url, window.location.origin);
    }
  }
  toString() {
    return this.url;
  }
}
