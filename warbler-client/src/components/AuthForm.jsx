import React, { Component } from 'react'

export default class AuthForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            profileImageUrl: "",
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const authType = this.props.signUp ? "signup" : "signin";
        const { navigate } = this.props;

        try {
            await this.props.onAuth(authType, this.state);
            if (localStorage.length) {
                navigate('/');
                console.log("Logged In!");
            } else {
                navigate('/signin');
            }

        } catch (error) {
            navigate('/signin');
            return console.error("Authentication Error:", error);
        }
    };

    render() {
        const { email, username, password, profileImageUrl } = this.state;
        const { heading, buttonText, signUp, errors, removeError } = this.props; //histoy.listen is depracated , it is beter to use hooks



        return (
            <div className='row justify-content-md-center text-center'>
                <div className='cold-md-6'>
                    <form onSubmit={this.handleSubmit}>
                        <h2>{heading}</h2>
                        {errors.message && (
                            <div className='alert alert-danger'>{errors.message}</div>
                        )}
                        <label htmlFor="email">Email:</label>
                        <input className="form-control" id="email" name="email" onChange={this.handleChange} value={email} type="text" />
                        <label htmlFor="password">Password:</label>
                        <input className="form-control" id="password" name="password" onChange={this.handleChange} type="password" />

                        {signUp && (
                            <div>
                                <label htmlFor="username">Username:</label>
                                <input className="form-control" id="username" name="username" onChange={this.handleChange} value={username} type="text" />
                                <label htmlFor="image-url">Image Url:</label>
                                <input className="form-control" id="image-url" name="profileImageUrl" onChange={this.handleChange} value={profileImageUrl} type="text" />
                            </div>
                        )}
                        <button className='btn btn-primary btn-block btn-lg'>
                            {buttonText}
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}



