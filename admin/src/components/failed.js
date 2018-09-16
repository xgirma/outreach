import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import withRoot from '../withRoot';
import styles from '../styles';

const Failed = ({ classes, name }) => (
  <div className={classes.root}>
    <Typography color="error" id="int-096">
      {`Sorry! There was an error fetching ${name}. Try refreshing.`}
    </Typography>
  </div>
);

Failed.propTypes = {
  name: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles, { withTheme: true })(Failed));
