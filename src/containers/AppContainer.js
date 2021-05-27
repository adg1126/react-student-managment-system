import { connect } from 'react-redux';
import { fetchClassesStart } from '../redux/classes/classesActions';
import { fetchStudentsStart } from '../redux/student/studentActions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../redux/user/userSelectors';
import { checkUserSession } from '../redux/user/userActions';
import App from '../App';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps, {
  fetchClassesStart,
  fetchStudentsStart,
  checkUserSession
})(App);
