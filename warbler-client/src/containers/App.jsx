import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store';
import { BrowserRouter as Router } from 'react-router-dom';


const App = () => (
  <Provider store={store}>
    <Router>
      <div>Hello world!</div>
    </Router>
  </Provider>
)

export default App;