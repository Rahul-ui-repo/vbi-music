import React from 'react';
import './App.css';
import NavBar from './components/menubar/NavBar';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import AsyncComponent from './AsyncComponent';


const history = createHistory();

const ALLSONGS = AsyncComponent(() =>
  import('./components/homepage/AllSongs').then(module => module.default)
)

const PLAYLISTS = AsyncComponent(() =>
  import('./components/Playlists/Playlists').then(module => module.default)
)


export class App extends React.Component {

  componentDidMount() {
    history.push('/allsongs');
  }

  render() {

    return (
      <div className="App">
        <Router history={history}>
          <NavBar />
          <div>
            <Switch>
              <Route exactly component={ALLSONGS} path="/allsongs" />
              <Route exactly component={PLAYLISTS} path="/playlists" />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
