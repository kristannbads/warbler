import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

export default function withAuth(ComponentToBeRendered) {
    class Authenticate extends Component {
        constructor(props) {
            super(props);

        }

        componentDidMount() {
            if (!this.props.isAuthenticated) {
                const { navigate } = this.props;
                navigate('/signin');

            }
        }
        componentDidUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                const { navigate } = this.props;
                navigate('/signin');

            }
        }
        render() {
            return (<ComponentToBeRendered {...this.props} />)
        }

    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.currentUser.isAuthenticated
        }


    }
    return connect(mapStateToProps)(Authenticate);
}



