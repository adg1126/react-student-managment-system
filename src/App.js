import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './ui/Theme';

import NavBarContainer from './containers/NavBarContainer';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Classes from './pages/Classes';
import Assignments from './pages/Assignments';
import Schedule from './pages/Schedule';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBarContainer>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/attendance' component={Attendance} />
            <Route path='/classes' component={Classes} />
            <Route path='/assignments' component={Assignments} />
            <Route path='/schedule' component={Schedule} />
          </Switch>
        </NavBarContainer>
      </BrowserRouter>
    </ThemeProvider>
  );
}
