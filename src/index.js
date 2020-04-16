/* eslint-disable no-useless-constructor */
import React, { Component } from './react2';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props)
  }
  static defaultProps = {
    name: 'jiangbo'
  }

  render() {
    let reactElement = React.createElement('div',
      null,
      React.createElement('p', null, 1),
      React.createElement('button', null, '+')
    )
    console.log("App -> render -> reactElement", reactElement)
    return reactElement
  }
}
const element = React.createElement(App, null)
console.log("element", element)

ReactDOM.render(
  element,
  document.getElementById('root')
);
