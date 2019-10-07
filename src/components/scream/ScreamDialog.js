import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import MyButton from '../../util/MyButton';
import LikeButton from './LikeButton';
import CommentForm from './CommentForm';
import Comments from './Comments';
// MUI stuff
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
// Redux stuff
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';
const styles = theme => ({
  dialogContent: {
    padding: 10
  },
  closeButton: {
    position: 'absolute',
    right: 8
  },
  moreButton: {
    fontSize: 14,
    color: theme.palette.primary.main,
    padding: 4
  },
  expandButton: {
    position: 'absolute',
    right: 2,
    bottom: 2
  },
  invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    marginBottom: 8
  },
  profileImage: {
    height: 200,
    maxWidth: 200,
    padding: 4,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  spinnerDiv: {
    textAlign: 'center',
    margin: '50px 0px'
  }
});

class ScreamDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: ''
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { userHandle, screamId } = this.props;
    const newPath = `/users/${userHandle}/scream/${screamId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getScream(this.props.screamId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };
  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments
      },
      UI: { loading }
    } = this.props;
    const moreOrUnfold = this.props.more ? (
      <MyButton
        onClick={this.handleOpen}
        tip='Expand scream'
        tipClassName={classes.moreButton}
      >
        <span>more</span>
      </MyButton>
    ) : (
      <MyButton
        onClick={this.handleOpen}
        tip='Expand scream'
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color='primary' />
      </MyButton>
    );
    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Fragment>
        <Grid container spacing={1}>
          <Grid item xm={12} md={5}>
            <img
              src={userImage}
              alt='Profile'
              className={classes.profileImage}
            />
          </Grid>
          <Grid item xm={12} md={7}>
            <Typography
              component={Link}
              color='primary'
              variant='h5'
              to={`/users/${userHandle}`}
            >
              @{userHandle}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant='body2' color='textSecondary'>
              {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant='body1'>{body}</Typography>
            <LikeButton screamId={screamId} />
            <span>{likeCount} Likes</span>
            <MyButton tip='comments'>
              <ChatIcon color='primary' />
            </MyButton>
            <span>{commentCount} comments</span>
          </Grid>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm screamId={screamId} comments={comments} />
        <Comments comments={comments} />
      </Fragment>
    );
    return (
      <Fragment>
        {moreOrUnfold}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <MyButton
            tip='Close'
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  scream: state.data.scream,
  UI: state.UI
});
const mapActionsToProps = {
  getScream,
  clearErrors
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
