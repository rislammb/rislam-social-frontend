import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import ImageLike from './ImageLike';
import ImageDialog from './ImageDialog';
import MyButton from '../../util/MyButton';
// MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';

const styles = {
  card: {
    padding: 0,
    marginBottom: 8,
    position: 'relative',
    '&:last-child': {
      marginBottom: 1
    }
  },
  image: {
    width: '100%',
    height: 'auto'
  },
  content: {
    display: 'flex',
    padding: 5,
    alignItems: 'center',
    fontSize: '1rem',
    '&:last-child': {
      paddingBottom: 2
    }
  },
  time: {
    paddingRight: 5
  }
};

class Image extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      image: {
        imageId,
        userHandle,
        imageUrl,
        createdAt,
        likeCount,
        commentCount
      }
    } = this.props;
    return (
      <Card className={classes.card}>
        <img src={imageUrl} alt='User' className={classes.image} />
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
          <ImageDialog
            imageId={imageId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Image.propTypes = {
  image: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Image);
