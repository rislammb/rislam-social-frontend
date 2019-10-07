import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import noImg from '../images/no-img.png';
// MUI stuff
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
  card: {
    display: 'flex',
    marginBottom: 8
  },
  cover: {
    minWidth: '20%',
    objectFit: 'cover'
  },
  cardContent: {
    width: '100%',
    flexDirection: 'column',
    padding: '15px 25px'
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 5
  },
  date: {
    height: 12,
    width: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginBottom: 7
  },
  fullLine: {
    height: 13,
    width: '90%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 7
  },
  halfLine: {
    height: 13,
    width: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  }
});

const ScreamSkeleton = props => {
  const { classes } = props;
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={noImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));
  return <Fragment>{content}</Fragment>;
};

ScreamSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScreamSkeleton);
