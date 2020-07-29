import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth } from '../../redux/modules/auth';
import '../../../sass/components/Modal-form.scss';

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
    <div className={`modal-form ${props.showLoginForm ? 'is-active' : ''}`}>
      <form className="modal-form-content" onSubmit={handleFormSubmit} noValidate>
        <h2 className="modal-form-header">LOGIN</h2>
        <ul className="modal-form-errors">
          { formErrors.map(err =>
              err.map(item =>
                <li className="modal-form-message modal-form-error" key={item}>{item}</li>
              )
          ) }
          { isAuthenticated === true &&
            <li className="modal-form-message modal-form-success">Login Success...Redirecting...</li>
          }
        </ul>
        <div className="modal-form-group">
          <label className="modal-form-label" htmlFor="email">Email</label>
          <input className="modal-form-input"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="modal-form-group">
          <label className="modal-form-label" htmlFor="password">Password</label>
          <input className="modal-form-input"
          id="password"
          name="password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button
          className={`button modal-form-button ${isAuthenticated ? 'is-disabled' : ''}`}>
          LOGIN</button>
      </form>
      <p className="modal-form-action">
        No account yet?
        <button
          className="modal-form-link"
          onClick={() => props.handleSwitchForm('register')} >REGISTER HERE</button>
      </p>
    </div>
  )
}

export default Login;
