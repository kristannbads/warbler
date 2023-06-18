import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import Homepage from '../components/Homepage'
import AuthForm from '../components/AuthForm'
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/error';
import currentUser from '../store/reducers/currentUser';
import { useNavigate } from 'react-router-dom';
import withAuth from '../hocs/withAuth';
import MessageForm from './MessageForm';

function Main(props) {
    const { authUser, errors, removeError } = props;
    const navigate = useNavigate();
    return (
        <div className='container'>

            <Routes>
                <Route exact path='/' element={<Homepage currentUser={currentUser} {...props} />} />
                <Route exact path='/signin' element={<AuthForm navigate={navigate} removeError={removeError} errors={errors} onAuth={authUser} buttonText='Log in' heading='Welcome back.' {...props} />} />
                <Route exact path='/signup' element={<AuthForm navigate={navigate} removeError={removeError} errors={errors} onAuth={authUser} signUp buttonText='Sign me up' heading='Join Warbler today.' {...props} />} />
                <Route path='/user/:id/messages/new' element={<RequireAuthMessageForm {...props} navigate={navigate} removeError={removeError} errors={errors} />}></Route>
            </Routes>

        </div>
    )
}

const RequireAuthMessageForm = withAuth(MessageForm);

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors,
    };
}

export default connect(mapStateToProps, { authUser, removeError })(Main);
