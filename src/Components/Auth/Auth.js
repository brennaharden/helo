import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {loginUser} from '../../ducks/reducer';

class Auth extends React.Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
    })
    }

    register = () => {
        const {username, password} = this.state;
        axios.post('/auth/register', {username, password}).then((res) => {
            this.props.loginUser(res.data);
            this.props.history.push('/dashboard');
        }).catch(err => {
            console.log(err);
            alert('Could not complete registration process.')
        })
    }

    login = () => {
        const {username, password} = this.state;
        console.log('AUTH', this.state)
        axios.post('/auth/login', {username, password}).then((res) => {
            this.props.loginUser(res.data);
            this.props.history.push('/dashboard');
        }).catch(err => {
            console.log(err);
            alert('Login failed.')
        })
    }

    render(){
        const {username, password} = this.state
        return <div className="auth">
            <div className="login-container">
                <img alt="Helo" src="https://raw.githubusercontent.com/DevMountain/simulation-3/master/assets/helo_logo.png"/>
                <h1>Helo</h1>
                <input onChange={e => this.changeHandler(e)} autoComplete="off" name="username" type="text" value={username} placeholder="Username"></input>
                <input onChange={e => this.changeHandler(e)} autoComplete="off" name="password" type="text" value={password} placeholder="Password"></input>
                
                <div className="login-register">
                    <button onClick={this.login}>Login</button>
                    <button onClick={this.register}>Register</button>
                </div>
            </div>
        </div>
    }
}

export default connect(null, {loginUser})(Auth);