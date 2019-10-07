import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// Redux
import { connect } from 'react-redux';
import { commentToImage } from '../../redux/actions/imageActions';

const styles = {
  form: {
    textAlign: 'center',
    padding: '0px 7px'
  },
  textField: {
    margin: '2px auto 2px auto'
  },
  button: {
    margin: 10,
    position: 'relative'
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    marginBottom: 10
  }
};

class ImageCommentForm extends Component {
  state = {
    body: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '' });
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.commentToImage(this.props.imageId, { body: this.state.body });
  };

  render() {
    const { classes, authenticated, comments } = this.props;
    const { errors } = this.state;
    const commentFormMarkup = authenticated ? (
      <Grid item sm={12} className={classes.form}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name='body'
            type='text'
            label='Comment on image'
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            multiline
            fullWidth
            className={classes.textField}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        {comments.length !== 0 ? (
          <hr className={classes.visibleSeparator} />
        ) : null}
      </Grid>
    ) : null;
    return commentFormMarkup;
  }
}

ImageCommentForm.propTypes = {
  commentToImage: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  imageId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

export default connect(
  mapStateToProps,
  { commentToImage }
)(withStyles(styles)(ImageCommentForm));
