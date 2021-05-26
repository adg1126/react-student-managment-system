import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './ui/Theme';

import NavBarContainer from './containers/NavBarContainer';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import ClassesContainer from './containers/ClassesContainer';
import Assignments from './pages/Assignments';
import Schedule from './pages/Schedule';
import ClassShowContainer from './containers/ClassShowContainer';
import SigninContainer from './containers/SigninContainer';
import SignupContainer from './containers/SignupContainer';

const App = ({ fetchClassesStart }) => {
  useEffect(() => {
    fetchClassesStart();
  }, [fetchClassesStart]);

  const withNavbar = () => {
    return (
      <NavBarContainer>
        <Route exact path='/' component={Dashboard} />
        <Route path='/attendance' component={Attendance} />
        <Route exact path='/classes' component={ClassesContainer} />
        <Route exact path='/classes/:classId' component={ClassShowContainer} />
        <Route path='/assignments' component={Assignments} />
        <Route path='/schedule' component={Schedule} />
      </NavBarContainer>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/signin' component={SigninContainer} />
          <Route exact path='/signup' component={SignupContainer} />
          <Route component={withNavbar} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
