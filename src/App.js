import { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './ui/Theme';
import history from './history';

import NavBarContainer from './containers/NavBarContainer';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import CoursesContainer from './containers/courses/CoursesContainer';
import Assignments from './pages/Assignments';
import Schedule from './pages/Schedule';
import CourseShowContainer from './containers/courses/CourseShowContainer';
import SigninContainer from './containers/SigninContainer';
import SignupContainer from './containers/SignupContainer';
import React from 'react';
import Students from './pages/Students';

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  const withNavbar = () => {
    return (
      <NavBarContainer>
        <Route exact path='/' component={Dashboard} />
        <Route path='/attendance' component={Attendance} />
        <Route exact path='/courses' component={CoursesContainer} />
        <Route
          exact
          path='/courses/:courseId'
          component={CourseShowContainer}
        />
        <Route exact path='/students' component={Students} />
        <Route path='/assignments' component={Assignments} />
        <Route path='/schedule' component={Schedule} />
      </NavBarContainer>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route
            exact
            path='/signin'
            render={() =>
              currentUser ? <Redirect to='/' /> : <SigninContainer />
            }
          />
          <Route
            exact
            path='/signup'
            render={() =>
              currentUser ? <Redirect to='/' /> : <SignupContainer />
            }
          />
          {currentUser ? (
            <Route component={withNavbar} />
          ) : (
            <Redirect to='/signin' />
          )}
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
