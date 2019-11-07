import React, {Component} from 'react'
import {Router, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import PrivateRoute from './components/PrivateRoute';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import {connect} from "react-redux";

const history = createBrowserHistory();

class App extends Component {
    render() {
        const {isAuthenticated} = this.props;

        return (
            <Router history={history}>
                <div className="jumbotron">
                    <div className="container">
                        <div className="row">
                            <Navbar/>
                            <PrivateRoute exact path="/" component={HomePage} isAuthenticated={isAuthenticated}/>
                            <Route path="/login" component={LoginPage}/>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    const {auth} = state;
    const {isAuthenticated} = auth;

    return {
        isAuthenticated
    }
};

export default connect(mapStateToProps)(App);
