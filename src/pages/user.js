import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Scream from '../components/scream/Scream';
import Image from '../components/images/Image';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';
import ScreamSkeleton from '../util/ScreamSkeleton';
import ImageSkeleton from '../util/ImageSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';
// redux
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';
import { getUserImages } from '../redux/actions/imageActions';

class user extends Component {
  state = {
    profile: null,
    screamIdParam: null,
    stateImage: false,
    imageIdParam: null
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;
    if (screamId) {
      this.setState({ screamIdParam: screamId });
    }
    const imageId = this.props.match.params.imageId;
    if (imageId) {
      this.setState({ imageIdParam: imageId });
    }
    this.props.getUserData(handle);
    this.props.getUserImages(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }
  loadImages = () => {
    this.setState({ stateImage: !this.state.stateImage });
  };
  render() {
    const {
      data: { screams, loading },
      image: { images }
    } = this.props;
    const { screamIdParam, stateImage, imageIdParam } = this.state;
    const screamsMarkup = loading ? (
      <ScreamSkeleton />
    ) : screams.length === 0 ? (
      <p style={{ textAlign: 'center' }}>No screams from this user</p>
    ) : !screamIdParam ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      screams.map(scream => {
        if (scream.screamId !== screamIdParam)
          return <Scream key={scream.screamId} scream={scream} />;
        else return <Scream key={scream.screamId} scream={scream} openDialog />;
      })
    );
    const imagesMarkup = loading ? (
      <ImageSkeleton />
    ) : images.length === 0 ? (
      <p style={{ textAlign: 'center' }}>No images from this user</p>
    ) : !imageIdParam ? (
      images.map(image => <Image key={image.imageId} image={image} />)
    ) : (
      images.map(image => {
        if (image.imageId !== imageIdParam)
          return <Image key={image.imageId} image={image} />;
        else return <Image key={image.imageId} image={image} openDialog />;
      })
    );
    return (
      <Grid container spacing={1}>
        <Grid item sm={8} xs={12}>
          {!stateImage ? screamsMarkup : imagesMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile
              profile={this.state.profile}
              stateImage={stateImage}
              loadImages={this.loadImages}
            />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  getUserImages: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data,
  image: state.image
});
const mapActionToProps = {
  getUserData,
  getUserImages
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(user);
