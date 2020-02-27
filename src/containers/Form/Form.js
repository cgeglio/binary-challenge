import React, { Component } from 'react';
import './Form.scss';
import { connect } from 'react-redux';
import { login } from '../../actions'


export class Form extends Component {
  constructor() {
    super()
    this.state={username: '', password: '', error: null}
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  verifyInputs = event => {
    event.preventDefault();
    let values = Object.values(this.state);
    values.includes('') ? this.setState({error: 'Enter a username & password to proceed.'}) : this.completeLogin();
  }

  completeLogin = () => {
    const id = Date.now();
    this.props.addUser({username: this.state.username, id: id, favorites: []})
    this.setState({username: '', password: '', error: null})
  }

  render() {
    return (
      <form className='login-form'>
        <input
           type='text'
           placeholder='Username...'
           value={this.state.username}
           name='username'
           onChange={this.handleChange}
        />
        <input
           type='password'
           placeholder='Password...'
           value={this.state.password}
           name='password'
           onChange={this.handleChange}
        />
        <button onClick={this.verifyInputs} className="login-submit-btn">SUBMIT</button>
        <p className="login-error-message">{this.state.error}</p>
      </form>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  addUser: user => (dispatch(login(user)))
})

export default connect(null, mapDispatchToProps)(Form)
