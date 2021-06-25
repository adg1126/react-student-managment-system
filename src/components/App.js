import { Component, lazy, Suspense } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../ui/Theme';
import history from '../history';

import ErrorBoundary from './ErrorBoundary';
import AppbarContainer from '../containers/appbar/AppbarContainer';
import CoursesContainer from '../containers/courses/CoursesContainer';
import SigninContainer from '../containers/SigninContainer';
import SignupContainer from '../containers/SignupContainer';
import Spinner from './Spinner';

const AttendanceContainer = lazy(() =>
    import('../containers/attendance/AttendanceContainer')
  ),
  ScheduleContainer = lazy(() =>
    import('../containers/schedule/ScheduleContainer')
  ),
  CourseShowContainer = lazy(() =>
    import('../containers/courses/CourseShowContainer')
  ),
  StudentsContainer = lazy(() =>
    import('../containers/students/StudentsContainer')
  ),
  StudentShowContainer = lazy(() =>
    import('../containers/students/StudentShowContainer')
  );

class App extends Component {
  componentDidMount() {
    this.props.checkUserSession();
  }

  componentDidUpdate() {
    if (this.props.currentUser) {
      this.props.fetchCoursesStart();
      this.props.fetchStudentsStart();
      this.props.fetchAttendanceStart();
    }
  }

  protectedRoutes = () => {
    return (
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <AppbarContainer />
          <Route path='/attendance' component={AttendanceContainer} />
          <Route exact path='/courses' component={CoursesContainer} />
          <Route
            exact
            path='/courses/:courseId'
            component={CourseShowContainer}
          />
          <Route exact path='/students' component={StudentsContainer} />
          <Route
            exact
            path='/students/:studentId'
            component={StudentShowContainer}
          />
          <Route path='/schedule' component={ScheduleContainer} />
        </Suspense>
      </ErrorBoundary>
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
                currentUser ? <Redirect to='/courses' /> : <SigninContainer />
              }
            />
            <Route
              exact
              path='/signup'
              render={() =>
                currentUser ? <Redirect to='/courses' /> : <SignupContainer />
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
