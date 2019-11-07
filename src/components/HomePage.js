import React from 'react';
import {connect} from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

class HomePage extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <Container component="main">
                <CssBaseline/>
            <div>
                {/*home page content*/}
            </div>
            </Container>
        );
    }
}

const mapStateToProps = () => ({});

const connectedLoginPage = connect(mapStateToProps)(HomePage);

export default connectedLoginPage;