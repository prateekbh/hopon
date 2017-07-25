import './style';
import { Component } from 'preact';
import {Router, Route} from 'preact-router';
//async puts it in a different bundle(code splitting 👇)
import Home from 'async!./components/home/home.jsx';
export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route component={Home} path="/"></Route>
        </Router>
      </div>
    );
  }
}
