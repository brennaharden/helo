import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class Post extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            img: '',
            content: '',
            username: '',
            profileImg: '',
            authorId: 0
        }
    }

    componentDidMount(){
        this.getPost()
    }
    getPost = () => {
        console.log(this.props)
        const {postid} = this.props.match.params
        axios.get(`/api/post/${postid}`).then(res => {
            console.log('POST RES', res)
            this.setState({
                title: res.data[0].title,
                img: res.data[0].img,
                content: res.data[0].content,
                username: res.data[0].username,
                profileImg: res.data[0].profile_pic,
                authorId: res.data[0].author_id
            })
        })
    }
    deletePost = () => {
        console.log('HIT')
        const {postid} = this.props.match.params
        axios.delete(`/api/post/${postid}`).then(() => {
            this.setState({
                title: '',
                img: '',
                content: '',
                username: '',
                profileImg: '',
                authorId: 0
            })
            this.props.history.push('/dashboard');
        })
    }

    render(){
        const {title, img, content, username, profileImg, authorId} = this.state
        const {id} = this.props.user
        console.log('POST STATE', this.state)
        console.log(id, authorId)
        return <div className="post">
                <div className="stack">
                    <div className='post-header'>
                        <h4>{title}</h4>
                        <div>
                            <span className="author-name">by {username}</span>
                            <img className="profile-mini" src={profileImg} />
                        </div>
                    </div>
                    <div className='post-content'>
                        <div className='post-img-container'>
                        <img className="post-img" src={img}/>
                        </div>
                        <div className="right-box">
                        <p className="post-copy">{content}</p>
                        {id === authorId ? (
                            <button onClick={() => this.deletePost}>Delete Post</button>
                        ): null}
                        </div>
                    </div>
                    
                </div>
                </div>
    }
}
const mapStateToProps = state => state

export default connect(mapStateToProps)(Post)