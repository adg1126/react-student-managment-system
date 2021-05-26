import { useEffect, useState } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './ui/Theme';
import history from './history';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/userActions';

import NavBarContainer from './containers/NavBarContainer';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import ClassesContainer from './containers/ClassesContainer';
import Assignments from './pages/Assignments';
import Schedule from './pages/Schedule';
import ClassShowContainer from './containers/ClassShowContainer';
import SigninContainer from './containers/SigninContainer';
import SignupContainer from './containers/SignupContainer';
import { auth, createUserProfileDocument } from './config/firebase';
import React from 'react';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.props.fetchClassesStart();

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          this.props.setCurrentUser({ id: snapshot.id, ...snapshot.data() });
        });
      } else {
        this.props.setCurrentUser(null);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  withNavbar = () => {
    return (
      <NavBarContainer currentUser={this.props.currentUser}>
        <Route exact path='/' component={Dashboard} />
        <Route path='/attendance' component={Attendance} />
        <Route exact path='/classes' component={ClassesContainer} />
        <Route exact path='/classes/:classId' component={ClassShowContainer} />
        <Route path='/assignments' component={Assignments} />
        <Route path='/schedule' component={Schedule} />
      </NavBarContainer>
    );
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path='/signin'
              render={() =>
                this.props.currentUser ? (
                  <Redirect to='/' />
                ) : (
                  <SigninContainer />
                )
              }
            />
            <Route
              exact
              path='/signup'
              render={() =>
                this.props.currentUser ? (
                  <Redirect to='/' />
                ) : (
                  <SignupContainer />
                )
              }
            />
            {this.props.currentUser ? (
              <Route component={this.withNavbar} />
            ) : (
              <Redirect to='/signin' />
            )}
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ user: { currentUser } }) => ({ currentUser });

export default connect(mapStateToProps, { setCurrentUser })(App);
