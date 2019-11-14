import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import {withStyles} from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {login} from "../actions/authActions";

const classes = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        const {history, isAuthenticated} = this.props;

        if (isAuthenticated) {
            history.push('/');
        }

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {history, isAuthenticated} = this.props;

        if (isAuthenticated) {
            history.push('/');
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {username, password} = this.state;

        const creds = {username: username.trim(), password: password.trim()};
        this.props.dispatch(login(creds));
    };

    render() {
        const {classes} = this.props;
        const {username, password, submitted, loading} = this.state;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={this.handleChange}
                            value={username}
                            error={submitted && !username}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.handleChange}
                            value={password}
                            error={submitted && !password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={loading}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                </Box>
            </Container>
        );
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const {auth} = state;
    const {isAuthenticated} = auth;

    return {
        isAuthenticated
    }
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);

export default withStyles(classes, {withTheme: true})(connectedLoginPage);