import React, {Component} from 'react';
import {connect} from "react-redux";

import {logout} from "../actions/authActions";
import {withStyles} from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

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
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
        };
    }

    handleLogout = () => {
        this.props.dispatch(logout())
            .then(this.handleClose);
    };

    handleMenu = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null
        });
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Container component="main">
                        <Toolbar>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h4" className={classes.title}>
                                Bazinga
                            </Typography>
                            {this.props.userData && (
                                <Typography align={"right"} variant="body2" className={classes.title}>
                                    Hi, {this.props.userData.first_name}
                                </Typography>
                            )}
                            {this.props.isAuthenticated && (
                                <div>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={this.state.anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(this.state.anchorEl)}
                                        onClose={this.handleClose}
                                    >
                                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                    </Menu>
                                </div>
                            )}
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    userData: state.auth.me
});

export default withStyles(
    classes, {
        withTheme: true
    })(connect(mapStateToProps)(Navbar));