import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser, logoutUser} from '../../ducks/reducer';
import axios from 'axios';

class Nav extends React.Component {

    componentDidMount(){
        this.props.getUser();
    }

    logout = () => {
        axios.get('/auth/logout').then( res => {
            this.props.logoutUser();
            this.props.history.push('/');
        }).catch(err => console.log(err))
    }

    render(){
        console.log(this.props)
        const {username, profilePicture} = this.props.user

        return <div className="nav">
            <img className="profile-pic" src={profilePicture} alt={username}/>
            <h1>{username}</h1>
            <div className="links">
            <span><Link to="/dashboard">Home</Link></span>
            <span><Link to="/new">New Post</Link></span>
            <span onClick={this.logout}><Link to="/">Logout</Link></span>
            </div>
        </div>
    }
}

const mapStateToProps = state => state;


export default connect(mapStateToProps, {getUser, logoutUser})(Nav);