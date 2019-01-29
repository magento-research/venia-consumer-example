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
export function resourceUrl(href) {
  let url;
  try {
    url = new window.URL(href);
  } catch (e) {
    url = new window.URL(href, window.location.origin);
  }
  const params = new URLSearchParams(url.search);
  params.append('referrer', window.location.hostname);
  url.search = `?${params}`;
  return url.href;
}