import React, { useEffect } from 'react';
import clsx from 'clsx';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

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

const NavBar = ({ children, drawerOpen, setDrawerOpen }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (matchesMD) setDrawerOpen(false);
  }, [drawerOpen, setDrawerOpen, matchesMD]);

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
