import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeAuth } from '../../redux/modules/auth';
import Login from '../modals/Login';
import Register from '../modals/Register';
import { Link } from 'react-router-dom';
import '../../../sass/components/Header.scss';

function Header () {
  const { isAuthenticated } = useSelector(state => state.auth);
  const [ showLoginForm, setShowLoginForm ] = useState(false);
  const [ showRegisterForm, setShowRegisterForm ] = useState(false);
  const dispatch = useDispatch();

  function handleFormDisplay(e) {
    e.preventDefault();
    if(showRegisterForm === false) {
      setShowLoginForm(!showLoginForm);
    } else {
      setShowRegisterForm(false);
    }
  }

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('authKey');
    dispatch(removeAuth());
  }

  function handleSwitchForm(switchTo) {
    if(switchTo === 'register') {
      setShowLoginForm(false);
      setTimeout(() => {
        setShowRegisterForm(true);
      }, 500);

    } else {
      setShowRegisterForm(false);
      setTimeout(() => {
        setShowLoginForm(true);
      }, 500);
    }
  }

  function handleRegisterClose() {
    setShowRegisterForm(false);
  }

  useEffect(() => {
    let bodyElement = document.body.classList;
    showLoginForm || showRegisterForm ?
    bodyElement.add('is-scroll-disabled') :
    bodyElement.remove('is-scroll-disabled');
  }, [showLoginForm, showRegisterForm]);

  useEffect(() =>{
    if(isAuthenticated) {
      setTimeout(() => {
        setShowLoginForm(false);
      }, 1000);
    }
  }, [isAuthenticated])

  return(
    <div>
      <header className="l-header">
        <div className="l-container flex flex-space-around flex-align-center">
          <h1 className="header-logo">
            <Link to="/">
              <img
              className="img-responsive"
              src={require('../../../images/site-logo.png')}
              alt="site logo" />
            </Link>
          </h1>
          <nav className="header-nav">
            <ul>
              <li>
                { !isAuthenticated &&
                  <a className="header-nav-link"
                  href="/"
                  onClick={handleFormDisplay}>{showLoginForm || showRegisterForm ? 'CLOSE' : 'LOGIN'}</a>
                }

                { isAuthenticated &&
                  <a className="header-nav-link"
                  href="/"
                  onClick={handleLogout}>LOGOUT</a>
                }
              </li>
            </ul>
          </nav>
        </div>
      </header>
      { showLoginForm &&
        <Login
          handleSwitchForm={handleSwitchForm}
          showLoginForm={showLoginForm} />
      }
      { showRegisterForm &&
        <Register
          handleSwitchForm={handleSwitchForm}
          showRegisterForm={showRegisterForm}
          handleRegisterClose={handleRegisterClose} />
      }
    </div>
  );
}

export default Header;
