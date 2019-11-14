import React, {Component} from 'react'
import {Route, Router} from 'react-router-dom';
import {connect} from "react-redux";
import {createBrowserHistory} from 'history';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';

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
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
