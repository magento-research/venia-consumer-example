import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import {
  Query as VeniaQuery,
  resourceUrl as veniaResourceUrl
} from "@magento/venia-concept/esm/drivers";

const client = new ApolloClient({
  uri: "/graphql"
});

// redux is a no-op
export function connect() {
  return Cmp => Cmp;
}

export class Query extends Component {
  render() {
    return <VeniaQuery client={client} {...this.props} />;
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
export function resourceUrl(href, opts = {}, ...rest) {
  let url = veniaResourceUrl(href, opts, ...rest);
  try {
    url = new window.URL(url);
  } catch (e) {
    const isImage = opts.type && opts.type.startsWith("image");
    const base = isImage
      ? process.env.REACT_APP_VENIA_BASE_DOMAIN
      : window.location.origin;
    url = new window.URL(url, base);
  }
  const params = new URLSearchParams(url.search);
  params.append("referrer", window.location.hostname);
  url.search = `?${params}`;
  return url.href;
}
