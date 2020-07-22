import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth } from '../../redux/modules/auth';

function Login(props) {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const { isAuthenticated, error } = useSelector(state => state.auth);
  const [ formErrors, setFormErrors ] = useState([]);
  const dispatch = useDispatch();

  function validate() {
    let emailErrors = [];
    let passwordErrors = [];

    if(!email) {
      emailErrors.push('Email field is required');
    }

    if(!email.includes('@')) {
      emailErrors.push('Invalid Email');
    }

    if(!password) {
      passwordErrors.push('Password field is required');
    }

    setFormErrors([
      emailErrors,
      passwordErrors
    ]);

    if(emailErrors.length || passwordErrors.length) {
      return false;
    }

    return true;
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    let isValid = validate();
    
    if(isValid) {
      dispatch(getAuth({ email: email, password: password }));
    }
  }

  useEffect(() =>{
    if(isAuthenticated === true) {
      setEmail('');
      setPassword('');
    }
  }, [isAuthenticated])

  if(error && error.length) return <h2>Error Login</h2>;
  return (
    <section className={`user-section ${props.showLoginForm ? 'is-active' : ''}`}>
      <form className="user-form" onSubmit={handleFormSubmit} noValidate>
        <h2 className="user-header">LOGIN</h2>
        <ul className="user-form-errors">
          { formErrors.map(err => 
              err.map(item => 
                <li className="user-form-message user-form-error" key={item}>{item}</li>
              )
          ) }
          { isAuthenticated === true && 
            <li className="user-form-message user-form-success">Login Success...Redirecting...</li>
          }
        </ul>
        <div className="user-form-group">
          <label className="user-label" htmlFor="email">Email</label>
          <input className="user-input" 
          id="email" 
          name="email" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="user-form-group">
          <label className="user-label" htmlFor="password">Password</label>
          <input className="user-input" 
          id="password" 
          name="password" 
          value={password}
          type="password" 
          onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button 
          className={`button user-button ${isAuthenticated ? 'is-disabled' : ''}`}>
          LOGIN</button>
      </form>
      <p className="user-action">
        No account yet? 
        <button 
          className="user-switch-button"
          onClick={() => props.handleSwitchForm('register')} >REGISTER HERE</button>
      </p>
    </section>
  )
}

export default Login;