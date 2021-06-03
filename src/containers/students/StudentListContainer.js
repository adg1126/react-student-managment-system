import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  selectStudentListForPreview,
  selectStudentsForClass,
  selectIsStudentsFetching
} from '../../redux/student/studentSelectors';
import { setStudentToUpdate } from '../../redux/student/studentActions';
import { setModalOpen } from '../../redux/modal/modalActions';
import history from '../../history';

import StudentList from '../../components/students/StudentList';
import WithSpinner from '../WithSpinner';

const mapStateToProps = state => {
  const path = history.location.pathname;
  const classId = path.substring(path.lastIndexOf('/') + 1);

  return {
    studentList:
      path !== '/students'
        ? selectStudentsForClass(classId)(state)
        : selectStudentListForPreview(state),
    isFetching: selectIsStudentsFetching(state)
  };
};

export default compose(
  connect(mapStateToProps, { setModalOpen, setStudentToUpdate }),
  WithSpinner
)(StudentList);
