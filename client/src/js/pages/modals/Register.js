import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRegister, getAuth } from '../../redux/modules/auth';

function Register(props) {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ formErrors, setFormErrors ] = useState([]);
  const { error, isRegistered } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  function validate() {
    let emailErrors = [];
    let passwordErrors = [];
    let confirmPasswordErrors = [];

    if(!email) {
      emailErrors.push('Email field is required');
    }

    if(!email.includes('@')) {
      emailErrors.push('Invalid Email');
    }

    if(!password) {
      passwordErrors.push('Password field is required')
    }

    if(!confirmPassword) {
      confirmPasswordErrors.push('Confirm Password field is required')
    }

    if(password !== confirmPassword) {
      confirmPasswordErrors.push('Passwords should match');
    }

    setFormErrors([
      emailErrors,
      passwordErrors,
      confirmPasswordErrors
    ]);

    if(emailErrors.length || passwordErrors.length || confirmPasswordErrors.length) {
      return false;
    }

    return true;
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    let isValid = validate();
    
    if(isValid) {
      dispatch(getRegister({ email: email, password: password }));
    }
  }

  useEffect(() => {
    if(isRegistered === true) {
      dispatch(getAuth({ email: email, password: password }));
      setTimeout(() => {
        props.handleRegisterClose();
      }, 1000);
    }
  }, [isRegistered])

  return(
    <section className={`user-section ${props.showRegisterForm ? 'is-active' : ''}`}>
      <form className="user-form" onSubmit={handleFormSubmit} noValidate> 
        <h2 className="user-header">REGISTER</h2>
        <ul className="user-form-errors">
          { formErrors.map(err => 
              err.map(item => 
                <li className="user-form-message user-form-error" key={item}>{item}</li>
              )
          ) }

          { error && error.length > 0 &&
            <li className="user-form-message user-form-error">Email already taken</li>
          }

          { isRegistered === true &&
            <li className="user-form-message user-form-success">Register Success...Redirecting...</li>
          }
        </ul>
        <div className="user-form-group">
          <label className="user-label" htmlFor="email">Email</label>
          <input className="user-input" 
          id="register-email" 
          name="register-email" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="user-form-group">
          <label className="user-label" htmlFor="password">Password</label>
          <input className="user-input" 
          id="js-register-password" 
          name="register-password" 
          value={password}
          type="password" 
          onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="user-form-group">
          <label className="user-label" htmlFor="confirm-password">Confirm Password</label>
          <input className="user-input" 
          id="js-confirm-password" 
          name="confirm-password" 
          value={confirmPassword}
          type="password" 
          onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button className={`button user-button ${isRegistered === true ? 'is-disabled' : ''}`}>
          REGISTER</button>
      </form>
      <p className="user-action">
        Already have an account? 
        <button 
          className="user-switch-button"
          onClick={() => props.handleSwitchForm('login')} >LOGIN HERE</button>
      </p>
    </section>
  ) 
}

export default Register;