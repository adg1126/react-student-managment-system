import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import NavBarItemsContainer from '../../containers/NavBarItemsContainer';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(7) + 1
    }
  },
  icon: {
    fill: 'rgba(255, 255, 255, .8)'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1)
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1)
    }
  }
}));

const NavBar = ({
  children,
  drawerOpen,
  setDrawerOpen,
  currentUser,
  signOutStart
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen
          })
        }}
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
        <div
          className={classes.toolbar}
          style={{ justifyContent: drawerOpen ? 'flex-end' : 'center' }}
        >
          <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
            {drawerOpen ? (
              <ChevronLeftIcon className={classes.icon} />
            ) : (
              <ChevronRightIcon className={classes.icon} />
            )}
          </IconButton>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};
export default NavBar;
