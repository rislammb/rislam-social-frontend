import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// Redux
import { connect } from 'react-redux';
import { likeImage, unlikeImage } from '../../redux/actions/imageActions';

class ImageLike extends Component {
  likedImage = () => {
    if (
      this.props.user.imageLikes &&
      this.props.user.imageLikes.find(
        like => like.imageId === this.props.imageId
      )
    )
      return true;
    else return false;
  };

  likeImage = () => {
    this.props.likeImage(this.props.imageId);
  };

  unlikeImage = () => {
    this.props.unlikeImage(this.props.imageId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeImage = !authenticated ? (
      <Link to='/login'>
        <MyButton tip='Like'>
          <FavoriteBorder color='primary' />
        </MyButton>
      </Link>
    ) : this.likedImage() ? (
      <MyButton tip='Undo like' onClick={this.unlikeImage}>
        <FavoriteIcon color='primary' />
      </MyButton>
    ) : (
      <MyButton tip='Like' onClick={this.likeImage}>
        <FavoriteBorder color='primary' />
      </MyButton>
    );
    return likeImage;
  }
}

ImageLike.propTypes = {
  user: PropTypes.object.isRequired,
  imageId: PropTypes.string.isRequired,
  likeImage: PropTypes.func.isRequired,
  unlikeImage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likeImage,
  unlikeImage
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ImageLike);
