import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import { Switch } from 'react-router-dom';
import withRoot from '../withRoot';
import styles from '../styles';
import PrivateRoute from '../routes/private-route';

import Media from '../containers/media';
import Admin from '../containers/admin';
import Information from "../containers/information";
import Introduction from "../containers/introduction";
import Event from "../containers/event";
import Blog from "../containers/blog";
import Services from "../containers/services";
import { pageListItems, adminListItems } from './drawer-menu';

class Home extends Component {
  static displayName = 'home-component';
  
  static propTypes = {
    signedIn: PropTypes.bool,
    classes: PropTypes.object.isRequired,
  };
  
  static defaultProps = {
    signedIn: false,
  };
  
  state = {
    mobileOpen: false,
  };
  
  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };
  
  render() {
    const { classes, theme } = this.props;
    
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>{pageListItems}</List>
        <Divider />
        <List>{adminListItems}</List>
      </div>
    );
    
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Responsive drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            onKeyDown={this.handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <Switch>
            <PrivateRoute exact path="/information" component={Information} />
            <PrivateRoute exact path="/introduction" component={Introduction} />
            <PrivateRoute exact path="/event" component={Event} />
            <PrivateRoute exact path="/blog" component={Blog} />
            <PrivateRoute exact path="/media" component={Media} />
            <PrivateRoute exact path="/services" component={Services} />
            <PrivateRoute exact path="/admin" component={Admin} />
            <PrivateRoute exact path="/" render={() => <h1>Not Found :(</h1>} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(Home));
