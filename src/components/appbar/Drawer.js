import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import NavBarItemsContainer from '../../containers/appbar/NavBarItemsContainer';

const useStyles = makeStyles(theme => ({
  drawer: {
    backgroundColor: theme.palette.secondary.main,
    padding: '1em 3em 1em 0.5em',
    color: 'white'
  }
}));

const Drawer = ({ drawerOpen, setDrawerOpen, currentUser, signOutStart }) => {
  const classes = useStyles();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={drawerOpen}
        classes={{ paper: classes.drawer }}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
      >
        <NavBarItemsContainer />
        {currentUser ? (
          <ListItem button onClick={signOutStart}>
            <ListItemIcon>
              <ExitToAppIcon style={{ fill: 'white' }} />
            </ListItemIcon>
            <ListItemText style={{ fontSize: 14 }}>Sign out</ListItemText>
          </ListItem>
        ) : null}
      </SwipeableDrawer>
    </>
  );
};

export default Drawer;
