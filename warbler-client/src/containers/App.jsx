import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';


const App = () => (
  <Provider store={store}>
    <Router>
      <div className='onboarding'>
        <Navbar />
      </div>
    </Router>
  </Provider>
)

export default App;