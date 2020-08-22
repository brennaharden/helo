import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Dashboard extends React.Component {
    constructor(){
        super();
        this.state = {
            search: '',
            posts: [],
            userposts: true
        }
    }

    handleCheckChange = (e) => {
        this.setState({
            [e.target.name]: [!e.target.checked]
        })
    }

    handleSearch = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getPosts = () => {
        const {search, userposts} = this.state;
        console.log("DASHBOARD STATE", this.state)
        console.log('DASHBOARD PROPS', this.props)
        axios.get(`/api/posts?userposts=${userposts}&search=${search}`).then(res => {
            console.log("GET POSTS", res)
            this.setState({
                posts: res.data
            })
            console.log("DASHBOARD STATE", this.state)
            console.log('DASHBOARD PROPS', this.props)
        }).catch(err => console.log(err))
    }

    render(){
        
        const {posts} = this.state
        const postMap = posts.map(post => {
            return <Link to={`/post/${post.id}`} key={post.id} className="link"><div className="post-box">
            <h3>
                {post.title}
            </h3>
            <div className="author-container">
                <span className="author-name">by {post.username}</span>
                <img className="profile-mini" src={post.profile_pic}/>
            </div>
            </div></Link>
        })
        // see about mapping the info you need, rather than using the Post component
        const {search} = this.state
        return <div className="dash">
            <div className='grey-box'>
            <input name="search" autocomplete="off" type="text" value={search} onChange={e => this.handleSearch(e)} placeholder="search by title"></input>
            <button onClick={() => this.getPosts()}>Search</button>
            <button>Reset</button>
            <input name="userposts" type="checkbox" checked={this.state.userposts} onChange={e => this.handleCheckChange(e)}/>
            </div>
            <div className='grey-box-2' >
                {postMap}
            </div>
        </div>
    }
}
const mapStateToProps = state => state

export default connect(mapStateToProps, {})(Dashboard);