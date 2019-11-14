import React from 'react';
import {connect} from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import {getUserInfo} from "../actions/authActions";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.props.dispatch(getUserInfo());
    }

    render() {
        return (
            <Container component="main">
                <CssBaseline/>
                <div>
                    {JSON.stringify(this.props.userData)}
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    userData: state.auth.me
});

const connectedLoginPage = connect(mapStateToProps)(HomePage);

export default connectedLoginPage;