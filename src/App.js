import React, { Component } from 'react';
import './App.css';
import VeniaProductDetail from '@magento/venia-concept/es2015/components/ProductFullDetail';
import { Notification } from 'react-notification'

class App extends Component {
  state = {}
  componentDidMount() {
    this.getProduct('https://gist.githubusercontent.com/zetlen/0b27881fe7dd26b5c79cfdf548043ad1/raw/dd16d1533fbfa1e84f9e3d85e75c3efb2c8ba640/silver-amor-bangle-set.json');
  }
  async getProduct(url) {
    const res = await fetch(url);
    this.setState({ product: await res.json() });
  }
  render() {
    const { product, added } = this.state;
    const notification = added ? <Notification message={`Added ${added} to cart!`} action="Cool" dismissAfter={3000} onDismiss={() => this.setState({ added: false })} /> : null;
    const productDetail = product ? <VeniaProductDetail
        product={product} addToCart={() => this.setState({ added: product.name })} /> : null;
    return (
      <div className="App">
        <header className="App-header">
          <p> Oh look, it's a <a
            className="App-link"
            href="https://facebook.github.io/create-react-app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            create-react-app
          </a> starter using a Venia component.</p>
        </header>
        {notification}
        {productDetail}
      </div>
    );
  }
}

export default App;
