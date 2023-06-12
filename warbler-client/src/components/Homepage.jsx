import React from 'react'
import { Link } from 'react-router-dom';
import currentUser from '../store/reducers/currentUser';
import MessageTimeline from './MessageTimeline';
import MessageItem from './MessageItem';

const Homepage = ({ currentUser }) => {
    if (!currentUser.isAuthenticated) {

        return (<div className='home-hero'>
            <h1>What's happening</h1>
            <h4>New to Warbler?</h4>
            <Link to='signup' className='btn btn-primary'>
                Sign up here
            </Link>
        </div>
        )
    }
    return (
        <div>
            <MessageTimeline />
        </div>
    )

};


export default Homepage;