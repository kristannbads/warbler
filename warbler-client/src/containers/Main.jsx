import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import Homepage from '../components/Homepage'
import AuthForm from '../components/AuthForm'

function Main(props) {
    return (
        <div className='container'>

            <Routes>
                <Route exact path='/' element={<Homepage {...props} />} />
                <Route exact path='/signin' element={<AuthForm buttonText='Log in' heading='Welcome back.' {...props} />} />
                <Route exact path='/signup' element={<AuthForm signUp buttonText='Sign me up' heading='Join Warbler today.' {...props} />} />
            </Routes>

        </div>
    )
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps)(Main);
