import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core/';
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

export const pageListItems = (
  <div>
    <Link to="/information" style={textDecoration}>
      <ListItem button>
        <ListItemIcon>
          <Room />
        </ListItemIcon>
        <ListItemText primary="Information" />
      </ListItem>
    </Link>

    <Link to="/introduction" style={textDecoration}>
      <ListItem button>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Introduction" />
      </ListItem>
    </Link>

    <Link to="/services" style={textDecoration}>
      <ListItem button>
        <ListItemIcon>
          <AssignmentInd />
        </ListItemIcon>
        <ListItemText primary="Services" />
      </ListItem>
    </Link>

    <Link to="/event" style={textDecoration}>
      <ListItem button>
        <ListItemIcon>
          <Event />
        </ListItemIcon>
        <ListItemText primary="Event" />
      </ListItem>
    </Link>

    <Link to="/blog" style={textDecoration}>
      <ListItem button>
        <ListItemIcon>
          <Create />
        </ListItemIcon>
        <ListItemText primary="Blog" />
      </ListItem>
    </Link>

    <Link to="/media" style={textDecoration}>
      <ListItem button>
        <ListItemIcon>
          <MusicVideo />
        </ListItemIcon>
        <ListItemText primary="Media" />
      </ListItem>
    </Link>

    <Link to="/admin" style={textDecoration}>
      <ListItem button>
        <ListItemIcon>
          <AccountBox />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>
    </Link>
  </div>
);

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
