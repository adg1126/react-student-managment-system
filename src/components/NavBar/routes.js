import PieChartIcon from '@material-ui/icons/PieChart';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ClassIcon from '@material-ui/icons/Class';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

export const ROUTES = [
  {
    section: 'Overview',
    routes: [
      {
        name: 'Dahboard',
        icon: () => <PieChartIcon />,
        route: '/',
        index: 0
      }
    ]
  },
  {
    section: 'Manage',
    routes: [
      {
        name: 'Attendance',
        icon: () => <PlaylistAddCheckIcon />,
        route: '/attendance',
        index: 1
      },
      {
        name: 'Classes',
        icon: () => <ClassIcon />,
        route: '/classes',
        index: 2
      },
      {
        name: 'Assignments',
        icon: () => <AssignmentIndIcon />,
        route: '/assignments',
        index: 3
      },
      {
        name: 'Schedule',
        icon: () => <ScheduleIcon />,
        route: '/schedule',
        index: 4
      }
    ]
  }
];
