import { connect } from 'react-redux';
import { fetchCoursesStart } from '../redux/courses/coursesActions';
import { fetchStudentsStart } from '../redux/student/studentActions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../redux/user/userSelectors';
import { checkUserSession } from '../redux/user/userActions';
import App from '../App';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps, {
  fetchCoursesStart,
  fetchStudentsStart,
  checkUserSession
})(App);
