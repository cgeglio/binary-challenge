import React, { Component } from 'react';
import './Form.scss';
import { connect } from 'react-redux';


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
    values.includes('') ? this.setState({error: 'Please enter a valid username and password!'}) : this.completeLogin();
  }

  completeLogin = () => {
    console.log('hi');
    this.setState({username: '', password: '', error: null})
  }

  render() {
    return (
      <form>
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
        <button onClick={this.verifyInputs} className="submit-btn">Submit</button>
        <p className="error-message">{this.state.error}</p>
      </form>
    )
  }
}


const mapDispatchToProps = dispatch => {

}

export default connect(null, mapDispatchToProps)(Form)
