import React from 'react';
// import axios from 'axios';

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
            [e.target.name]: !e.target.checked
        })
    }

    handleSearch = (e) => {
        this.setState({
            [e.target.name]: [e.target.value]
        })
    }

    // getPosts = () => {
    //     const {search, posts, userPosts} = this.state;
    //     axios.get('/api/posts/:userid', )
    // }

    render(){
        const {search} = this.state
        return <div className="dash">
            <input name="search" type="text" value={search} onChange={e => this.handleSearch(e)} placeholder="search by title"></input>
            <button>Search</button>
            <button>Reset</button>
            <input name="userposts" type="checkbox" checked={true} onChange={e => this.handleCheckChange(e)}/>
        </div>
    }
}

export default Dashboard