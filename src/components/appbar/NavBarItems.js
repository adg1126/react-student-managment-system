import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import PieChartIcon from '@material-ui/icons/PieChart';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ClassIcon from '@material-ui/icons/Class';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles(theme => ({
  drawerItemSelected: {
    color: theme.palette.common.highlightedIndigo
  }
}));

const NavBarItems = ({ drawerOpen, tabIndex, setTabIndex, setDrawerOpen }) => {
  const classes = useStyles();
  const theme = useTheme();

  const ROUTES = [
    {
      section: 'Overview',
      routes: [
        {
          name: 'Dashboard',
          icon: () => (
            <PieChartIcon
              style={{
                fill:
                  tabIndex === 0
                    ? theme.palette.common.highlightedIndigo
                    : 'white'
              }}
            />
          ),
          route: '/',
          index: 0
        }
      ]
    },
    {
      section: 'Manage',
      routes: [
        {
          name: 'Courses',
          icon: () => (
            <ClassIcon
              style={{
                fill:
                  tabIndex === 1
                    ? theme.palette.common.highlightedIndigo
                    : 'white'
              }}
            />
          ),
          route: '/courses',
          index: 1
        },
        {
          name: 'Students',
          icon: () => (
            <PeopleIcon
              style={{
                fill:
                  tabIndex === 2
                    ? theme.palette.common.highlightedIndigo
                    : 'white'
              }}
            />
          ),
          route: '/students',
          index: 2
        },
        {
          name: 'Schedule',
          icon: () => (
            <ScheduleIcon
              style={{
                fill:
                  tabIndex === 3
                    ? theme.palette.common.highlightedIndigo
                    : 'white'
              }}
            />
          ),
          route: '/schedule',
          index: 3
        }
      ]
    },
    {
      section: 'Monitor',
      routes: [
        {
          name: 'Attendance',
          icon: () => (
            <PlaylistAddCheckIcon
              style={{
                fill:
                  tabIndex === 4
                    ? theme.palette.common.highlightedIndigo
                    : 'white'
              }}
            />
          ),
          route: '/attendance',
          index: 4
        },

        {
          name: 'Assignments',
          icon: () => (
            <AssignmentIndIcon
              style={{
                fill:
                  tabIndex === 5
                    ? theme.palette.common.highlightedIndigo
                    : 'white'
              }}
            />
          ),
          route: '/assignments',
          index: 5
        }
      ]
    }
  ];

  return ROUTES.map((section, i) => (
    <List key={i}>
      {drawerOpen ? (
        <Typography
          style={{
            padding: '1em',
            fontSize: 15,
            fontWeight: 500
          }}
        >
          {section.section}
        </Typography>
      ) : null}
      {section.routes.map(({ name, icon, route, index }) => (
        <ListItem
          button
          component={Link}
          to={route}
          key={name}
          onClick={() => {
            setTabIndex(index);
            setDrawerOpen(false);
          }}
          selected={tabIndex === index}
          classes={{ selected: classes.drawerItemSelected }}
        >
          <ListItemIcon>{icon()}</ListItemIcon>
          <ListItemText style={{ fontSize: 14 }}>{name}</ListItemText>
        </ListItem>
      ))}
    </List>
  ));
};

export default NavBarItems;
