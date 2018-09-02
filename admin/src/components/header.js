/* eslint-disable react/destructuring-assignment */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Drawer, Divider, List, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core';
import { ChevronRight, ChevronLeft, Menu } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { pageListItems, adminListItems } from './drawer-menu';
import withRoot from '../withRoot';
import styles from '../style';

class Header extends Component {
  displayName = 'Header';

  static propTypes = {
    signedIn: PropTypes.bool,
    username: PropTypes.string,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  static defaultProps = {
    signedIn: false,
    username: '',
  };

  /* eslint-disable */
  state = {
    value: 'home',
    open: false,
  };
  /* eslint-enable */

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { signedIn, username } = this.props;
    const { classes, theme } = this.props;

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
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}
              >
                <Menu />
              </IconButton>
            )}
            <Typography variant="title" color="inherit" className={classes.flex}>
              Outreach Administration Panel
            </Typography>
            <div>
              {signedIn && (
                <Typography variant="caption" color="inherit" className={classes.flex}>
                  {username}
                </Typography>
              )}
            </div>
          </Toolbar>
        </AppBar>
        {/* body: drawer & body */}
        {signedIn && (
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
                {/* TODO chevron toggle */}
              </IconButton>
            </div>
            <Divider />
            <Divider />
            <List>{pageListItems}</List>
            <Divider />
            <List>{adminListItems}</List>
          </Drawer>
        )}
      </Fragment>
    );
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(Header));
