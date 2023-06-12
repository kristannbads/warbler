import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Main from './Main';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';


if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (error) {
    store.dispatch(setCurrentUser({}))
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className='onboarding'>
        <Navbar />
        <Main />
      </div>
    </Router>
  </Provider>
)

export default App;