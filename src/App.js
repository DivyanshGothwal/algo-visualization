import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';


import Main from './page';


function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </HashRouter>
  );
}

export default App;
