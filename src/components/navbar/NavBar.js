import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRighttIcon from '@material-ui/icons/ChevronRight';

import NavBarItemsContainer from '../../containers/NavBarItemsContainer';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
    alignItems: 'center'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1)
  }
}));

const NavBar = ({ children, drawerOpen, setDrawerOpen }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item>
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
          <Divider />
          <NavBarItemsContainer />
          <div
            className={classes.toolbar}
            style={{ justifyContent: drawerOpen ? 'flex-end' : 'center' }}
          >
            <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
              {drawerOpen ? (
                <ChevronLeftIcon className={classes.icon} />
              ) : (
                <ChevronRighttIcon className={classes.icon} />
              )}
            </IconButton>
          </div>
        </Drawer>
      </Grid>
      <Grid item>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </Grid>
    </Grid>
  );
};

export default NavBar;
