import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ImageLike from './ImageLike';
import ImageCommentForm from './ImageCommentForm';
import ImageComments from './ImageComments';
import dayjs from 'dayjs';
import MyButton from '../../util/MyButton';
// MUI stuff
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
// Redux stuff
import { connect } from 'react-redux';
import { getImage, clearErrors } from '../../redux/actions/imageActions';
const styles = {
  dialogContent: {
    padding: 0
  },
  closeButton: {
    position: 'absolute',
    right: 8
  },
  expandButton: {
    position: 'absolute',
    right: 2,
    bottom: 2
  },
  spinnerDiv: {
    textAlign: 'center',
    margin: '50px 0px'
  },
  image: {
    width: '100%',
    height: 'auto'
  },
  content: {
    display: 'flex',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1rem',
    '&:last-child': {
      paddingBottom: 1
    }
  },
  time: {
    paddingRight: 5
  }
};

class ImageDialog extends Component {
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
    const { userHandle, imageId } = this.props;
    const newPath = `/users/${userHandle}/image/${imageId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;
    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getImage(this.props.imageId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };
  render() {
    const {
      classes,
      image: {
        image: {
          imageId,
          imageUrl,
          createdAt,
          likeCount,
          commentCount,
          comments
        }
      },
      UI: { loading }
    } = this.props;

    const imageMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Fragment>
        <Card className={classes.card}>
          <img src={imageUrl} alt='User profile' className={classes.image} />
          <CardContent className={classes.content}>
            <Typography
              variant='body2'
              color='textSecondary'
              className={classes.time}
            >
              {dayjs(createdAt).fromNow()}
            </Typography>
            <ImageLike imageId={imageId} />
            <span>{likeCount} Likes</span>
            <MyButton tip='comments'>
              <ChatIcon color='primary' />
            </MyButton>
            <span>{commentCount} comments</span>
          </CardContent>
        </Card>
        <ImageCommentForm imageId={imageId} comments={comments} />
        <ImageComments comments={comments} className={classes.comments} />
      </Fragment>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip='Expand image'
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color='primary' />
        </MyButton>
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
            {imageMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ImageDialog.propTypes = {
  getImage: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  imageId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  image: state.image,
  UI: state.UI
});

const mapActionToProps = {
  getImage,
  clearErrors
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(ImageDialog));
