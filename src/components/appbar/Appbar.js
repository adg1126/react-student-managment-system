import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import DrawerContainer from '../../containers/appbar/DrawerContainer';

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

const useStyles = makeStyles(theme => ({
  appBar: { width: '100vw', backgroundColor: 'white', left: 0 },
  menuButton: { marginLeft: theme.spacing(1) },
  toolbar: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '4em'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '2em'
    }
  }
}));

const Appbar = ({ drawerOpen, setDrawerOpen }) => {
  const classes = useStyles();

  return (
    <>
      <ElevationScroll>
        <AppBar position='fixed' className={classes.appBar}>
          <Toolbar style={{ width: '100vw' }} disableGutters>
            <IconButton
              className={classes.menuButton}
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <MenuIcon />
            </IconButton>
            <DrawerContainer />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbar} />
    </>
  );
};

export default Appbar;
