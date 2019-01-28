import React, { Component } from "react";
import VeniaProductDetail from "@magento/venia-concept/esm/components/ProductFullDetail";
import Notification from "./Notification";

export default class Presentational extends Component {
  state = {};
  componentDidMount() {
    this.getProduct(
      "https://gist.githubusercontent.com/zetlen/0b27881fe7dd26b5c79cfdf548043ad1/raw/f39c18c3f59c1c14e78287968b1bc89dd2d7ff45/silver-amor-bangle-set.json"
    );
  }
  async getProduct(url) {
    const res = await fetch(url);
    const {
      data: {
        productDetail: {
          items: [product]
        }
      }
    } = await res.json();
    this.setState({ product });
  }
  render() {
    const { product, added } = this.state;
    const notification = <Notification
        message={`Added ${added} to cart!`}
        open={!!added}
        onClose={() => this.setState({ added: false })}
      />;
    const productDetail = product ? (
      <VeniaProductDetail
        product={product}
        addToCart={() => this.setState({ added: product.name })}
      />
    ) : null;
    return (
      <div>
        {notification}
        {productDetail}
      </div>
    );
  }
}