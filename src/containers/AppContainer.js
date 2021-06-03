import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../redux/user/userSelectors';

import { checkUserSession } from '../redux/user/userActions';
import { fetchCoursesStart } from '../redux/courses/coursesActions';
import { fetchStudentsStart } from '../redux/student/studentActions';

import App from '../components/App';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps, {
  checkUserSession,
  fetchCoursesStart,
  fetchStudentsStart
})(App);
