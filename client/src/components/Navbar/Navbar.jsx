import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import memories from "../../images/memories.png";
import { LOGOUT } from "../../constants/actionTypes";

function Navbar() {
    const classes = useStyles();
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    );
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const token = user?.token;

        // JWT

        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location, user]);

    const handleLogout = () => {
        dispatch({ type: LOGOUT });
        history.push("/");
        setUser(null);
    };
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography
                    className={classes.heading}
                    component={Link}
                    to="/"
                    variant="h2"
                    align="center"
                >
                    Memories
                </Typography>
                <img
                    className={classes.image}
                    src={memories}
                    alt="memories"
                    height="60"
                />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar
                            className={classes.purple}
                            alt={user.result.name}
                            src={user.result.image}
                        >
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">
                            {user.result.name}
                        </Typography>
                        <Button
                            className={classes.logout}
                            variant="contained"
                            color="secondary"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button
                        component={Link}
                        to="/auth"
                        variant="contained"
                        color="primary"
                    >
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
