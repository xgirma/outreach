import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText, MenuItem } from '@material-ui/core/';
import {
  Home,
  Event,
  Create,
  MusicVideo,
  AccountBox,
  ExitToApp,
  AssignmentInd,
  Room,
} from '@material-ui/icons';

const textDecoration = { textDecoration: 'none' };

export const DrawerMenuItems = ({ classes }) => (
  <div>
    <Link to="/information" style={textDecoration}>
      <MenuItem className={classes.menuItem}>
        <ListItemIcon className={classes.icon}>
          <Room />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Information" />
      </MenuItem>
    </Link>

    <Link to="/introduction" style={textDecoration}>
      <MenuItem className={classes.menuItem}>
        <ListItemIcon className={classes.icon}>
          <Home />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Introduction" />
      </MenuItem>
    </Link>

    <Link to="/services" style={textDecoration}>
      <MenuItem className={classes.menuItem}>
        <ListItemIcon className={classes.icon}>
          <AssignmentInd />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Services" />
      </MenuItem>
    </Link>

    <Link to="/event" style={textDecoration}>
      <MenuItem className={classes.menuItem}>
        <ListItemIcon className={classes.icon}>
          <Event />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Event" />
      </MenuItem>
    </Link>

    <Link to="/blog" style={textDecoration}>
      <MenuItem className={classes.menuItem}>
        <ListItemIcon className={classes.icon}>
          <Create />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Blog" />
      </MenuItem>
    </Link>

    <Link to="/media" style={textDecoration}>
      <MenuItem className={classes.menuItem}>
        <ListItemIcon className={classes.icon}>
          <MusicVideo />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Media" />
      </MenuItem>
    </Link>

    <Link to="/admin" style={textDecoration}>
      <MenuItem className={classes.menuItem}>
        <ListItemIcon className={classes.icon}>
          <AccountBox />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Account" />
      </MenuItem>
    </Link>
  </div>
);

DrawerMenuItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const adminListItems = (
  <div>
    <Link to="/signin" style={textDecoration}>
      <ListItem button>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText primary="Sign out" />
      </ListItem>
    </Link>
  </div>
);
