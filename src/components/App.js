import { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../ui/Theme';
import history from '../history';

import NavBarContainer from '../containers/NavBarContainer';
import Dashboard from '../pages/Dashboard';
import Attendance from '../pages/Attendance';
import CoursesContainer from '../containers/courses/CoursesContainer';
import Assignments from '../pages/Assignments';
import Schedule from '../pages/Schedule';
import CourseShowContainer from '../containers/courses/CourseShowContainer';
import SigninContainer from '../containers/SigninContainer';
import SignupContainer from '../containers/SignupContainer';
import React from 'react';
import StudentsContainer from '../containers/students/StudentsContainer';

class App extends Component {
  componentDidMount() {
    this.props.checkUserSession();
  }

  componentDidUpdate() {
    if (this.props.currentUser) {
      this.props.fetchCoursesStart();
      this.props.fetchStudentsStart();
    }
  }

  protectedRoutes = () => {
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
        <Route exact path='/students' component={StudentsContainer} />
        <Route path='/assignments' component={Assignments} />
        <Route path='/schedule' component={Schedule} />
      </NavBarContainer>
    );
  };

  render() {
    const { currentUser } = this.props;

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
              <Route component={this.protectedRoutes} />
            ) : (
              <Redirect to='/signin' />
            )}
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
