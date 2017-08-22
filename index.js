import './style';
import { Component } from 'preact';
import {Router, Route} from 'preact-router';
//async puts it in a different bundle(code splitting 👇)
import Home from 'async!./components/home/home.jsx';
import Stage from 'async!./components/stage/stage.jsx';
export default class App extends Component {
  render() {
    return (
      <div class='app'>
        <Router>
          <Route component={Home} path="/"></Route>
					<Route component={Stage} path="/play"></Route>
        </Router>
      </div>
    );
  }
}
