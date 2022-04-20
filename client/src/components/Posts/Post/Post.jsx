import React from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { deletePost, likePost } from "./../../../actions/posts";

function Post({ post, setCurrentId }) {
    const classes = useStyles();
    const {
        _id,
        creator,
        title,
        message,
        tags,
        selectedFile,
        likeCount,
        createdAt,
    } = post;
    const dispatch = useDispatch();

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={selectedFile}
                title={title}
            />
            <div className={classes.overlay}>
                <Typography variant="h6">{creator}</Typography>
                <Typography variant="body2">
                    {moment(createdAt).fromNow()}
                </Typography>
            </div>
            <div className={classes.overlay2}>
                <Button
                    style={{ color: "white" }}
                    size="small"
                    onClick={() => {
                        setCurrentId(_id);
                    }}
                >
                    <MoreHorizIcon fontSize="medium" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">
                    {tags.map((tag) => `#${tag} `)}
                </Typography>
            </div>
            <Typography className={classes.title} variant="h5">
                {title}
            </Typography>
            <CardContent>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    gutterBottom
                >
                    {message}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button
                    size="small"
                    color="primary"
                    onClick={() => dispatch(likePost(_id))}
                >
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp; Like &nbsp; {/* &nbsp; -> this a space */}
                    {likeCount}
                </Button>
                <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                        dispatch(deletePost(_id));
                    }}
                >
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post;
