/* eslint-disable react/destructuring-assignment */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Drawer, Divider, List, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { pageListItems, adminListItems } from './drawer-menu';
import withRoot from '../withRoot';
import styles from '../styles';

class Header extends Component {
  displayName = 'Header';

  static propTypes = {
    signedIn: PropTypes.bool,
    classes: PropTypes.object.isRequired,
  };

  static defaultProps = {
    signedIn: false,
  };

  /* eslint-disable */
  state = {
    value: 'home',
    open: false,
    left: false,
  };
  /* eslint-enable */

  toggleDrawer = (open) => () => {
    this.setState({
      left: open,
    });
  };

  render() {
    const { signedIn } = this.props;
    const { classes } = this.props;

    return (
      <Fragment>
        {/* menu */}
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            {signedIn && (
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.toggleDrawer(true)}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}
              >
                <Menu />
              </IconButton>
            )}
            <Typography variant="title" color="inherit" className={classes.flex}>
              Content Admin
            </Typography>
          </Toolbar>
        </AppBar>
        {/* body: drawer & body */}
        {signedIn && (
          <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer(false)}
              onKeyDown={this.toggleDrawer(false)}
            >
              <Divider />
              <Divider />
              <List>{pageListItems}</List>
              <Divider />
              <List>{adminListItems}</List>
            </div>
          </Drawer>
        )}
      </Fragment>
    );
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(Header));
