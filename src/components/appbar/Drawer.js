import React from 'react';
import history from '../../history';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NavBarItemsContainer from '../../containers/appbar/NavBarItemsContainer';
import logo from '../../assets/sm-sys.png';

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
        <Grid
          container
          direction='row'
          alignItems='center'
          justify='space-around'
        >
          <Button onClick={() => history.push('/courses')}>
            <Grid item>
              <img alt='company logo' style={{ width: 50 }} src={logo} />
            </Grid>
            <Grid item>
              <Typography style={{ fontSize: 28, color: 'white' }}>
                SM-SYS
              </Typography>
            </Grid>
          </Button>
        </Grid>
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
