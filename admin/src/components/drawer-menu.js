import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import {
  Info,
  Home,
  Event,
  Create,
  MusicVideo,
  AccountBox,
  ExitToApp,
  AssignmentInd,
} from '@material-ui/icons';

export const pageListItems = (
  <div>
    <Link to="/information">
      <ListItem button>
        <ListItemIcon>
          <Info />
        </ListItemIcon>
        <ListItemText primary="Information" />
      </ListItem>
    </Link>

    <Link to="/introduction">
      <ListItem button>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Introduction" />
      </ListItem>
    </Link>

    <Link to="/services">
      <ListItem button>
        <ListItemIcon>
          <AssignmentInd />
        </ListItemIcon>
        <ListItemText primary="Services" />
      </ListItem>
    </Link>

    <Link to="/event">
      <ListItem button>
        <ListItemIcon>
          <Event />
        </ListItemIcon>
        <ListItemText primary="Event" />
      </ListItem>
    </Link>

    <Link to="/blog">
      <ListItem button>
        <ListItemIcon>
          <Create />
        </ListItemIcon>
        <ListItemText primary="Blog" />
      </ListItem>
    </Link>

    <Link to="/blog">
      <ListItem button>
        <ListItemIcon>
          <MusicVideo />
        </ListItemIcon>
        <ListItemText primary="Media" />
      </ListItem>
    </Link>
  </div>
);

export const adminListItems = (
  <div>
    <Link to="/admin">
      <ListItem button>
        <ListItemIcon>
          <AccountBox />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>
    </Link>

    <Link to="/signin">
      <ListItem button>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText primary="Sign out" />
      </ListItem>
    </Link>
  </div>
);
