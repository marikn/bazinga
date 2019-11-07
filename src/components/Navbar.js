import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from "react-redux";
import {logout} from "../actions/authActions";
import Container from "@material-ui/core/Container";

const classes = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
});

class Navbar extends Component {
    handleLogout = (e) => {
        e.preventDefault();
        this.props.dispatch(logout())
    };

    render() {
        const {classes, isAuthenticated} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Container component="main">
                        <Toolbar>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Bazinga
                            </Typography>
                            {(isAuthenticated) &&
                            <Button color="inherit" onClick={this.handleLogout}>Logout</Button>}
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {auth} = state;
    const {isAuthenticated} = auth;

    return {
        isAuthenticated
    }
}

const connectedNavbar = connect(mapStateToProps)(Navbar);
export default withStyles(classes, {withTheme: true})(connectedNavbar);