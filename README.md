# Venia Consumer Example

[![image](https://user-images.githubusercontent.com/1643758/51866627-111b6380-230f-11e9-83d3-d154b5e6194c.png)](https://venia-consumer-example.now.sh)

https://venia-consumer-example.now.sh/

A build artifact is inspectable at https://venia-consumer-example.now.sh/_src . Check it out!

This simple app demonstrates Venia components in use in two routes, with live Magento data coming from a proxied backend in one case, and custom data fed to a presentational component in the other case.

Here is how you consume Venia components:

1. Install Venia in your project with npm `npm install @magento/venia-concept` or yarn `yarn add @magento/venia-concept`.

1. Import individual Venia components from the `esm` directory of the Venia package. These files are ES Modules, so Webpack can optimize them with tree-sharking.

```js
import VeniaProductDetail from '@magento/venia-concept/esm/components/ProductFullDetail';
import Product from '@magento/venia-concept/esm/RootComponents/Product'
```

1. To make Venia components work reliably, you should either surround them with a Venia Adapter:

```js
import VeniaAdapter from '@magento/venia-concept/esm/drivers/adapter';
function App () => (
  <VeniaAdapter store={yourOwnStore} client={yourOwnClient}
)
```

**OR**, use your build tool (Webpack, Rollup, etc) to override the Venia **drivers component** with your own implementation of query, routing, URL building and linking modules.

**webpack.config.js:**

```js
  module: {
    alias: {
      "@magento/venia-drivers": "./myReplacementDrivers"
    }
  }
}
```

**./myReplacementDrivers:**

```js
import React, { Component } from 'react';
import { resourceUrl as veniaResourceUrl } from '@magento/venia-concept/esm/drivers';

// A replacement Query that loads forever
export class Query extends Component {
  render() {
    return this.props.children({ loading: true });
  }
}

// A replacement Link that doesn't use the client-side router
export class Link extends Component {
  render() {
    const { children, to, ...other } = this.props;
    return <a {...other} href={to}>{children}</a>;
  }
}

// A replacement resourceUrl that calls Venia's implementation by importing
// Venia's default driver, then additionally validates urls and adds a parameter
export function resourceUrl(...args) {
  let url = veniaResourceUrl(...args);
  try {
    url = new window.URL(url);
  } catch (e) {
    url = new window.URL(url, window.location.origin);
  }
  const params = new URLSearchParams(url.search);
  params.append('referrer', window.location.hostname);
  url.search = `?${params}`;
  return url.href;
}

// You can also override Router, Route, Redirect, and react-redux's
// `connect()` HOC
```

Then, you can override "deep dependencies", such as leaf nodes of Venia components using React Router Link elements.

Below are the general-purpose instructions for `create-react-app` projects. Bear in mind that this project is 'ejected'!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
