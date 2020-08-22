import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
class Form extends React.Component {
    constructor(){
        super();
        this.state = {
            title: '',
            img: '',
            content: ''
        }
    }
    
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addPost = () => {
        const {title, img, content} = this.state
        console.log(this.state)
        axios.post(`/api/post`, {title, img, content}).then(() => {
            this.props.history.push('/dashboard');
        }).catch(err => {
            console.log(err)
        })
    }

    render(){
        const {title, img, content} = this.state
        return <div className='new-post'>
            <input autocomplete="off" name="title" placeholder="title"value={title} type="text" onChange={e => this.handleChange(e)}/>
            <img src={img ? img : 'https://user-images.githubusercontent.com/2351721/31314483-7611c488-ac0e-11e7-97d1-3cfc1c79610e.png'} />
            <input autocomplete="off" name="img" placeholder="image url" value={img} type="text" onChange={e => this.handleChange(e)}/>
            <input autocomplete="off" name="content" placeholder="content" value={content} type="text" onChange={e => this.handleChange(e)}/>
    <button onClick={() => this.addPost()}>Post</button>       
        </div>
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Form)