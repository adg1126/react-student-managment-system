import { compose } from 'redux';
import { connect } from 'react-redux';
import history from '../../history';

import {
  selectStudentsStatus,
  selectStudentListForPreview,
  selectStudentsForClass,
  selectIsStudentsFetching,
  selectStudentsErrMessage
} from '../../redux/student/studentSelectors';
import {
  selectCourseListForPreview,
  selectIsCoursesFetching,
  selectCoursesErrMessage
} from '../../redux/courses/coursesSelectors';

import { setModalOpen } from '../../redux/modal/modalActions';
import { setStudentToUpdate } from '../../redux/student/studentActions';

import WithSpinner from '../WithSpinner';
import Students from '../../pages/Students';

const mapStateToProps = state => {
  const path = history.location.pathname;
  const classId = path.substring(path.lastIndexOf('/') + 1);

  return {
    status: selectStudentsStatus(state),
    studentList:
      path !== '/students'
        ? selectStudentsForClass(classId)(state)
        : selectStudentListForPreview(state),
    isFetching:
      selectIsStudentsFetching(state) && selectIsCoursesFetching(state),
    errMessage:
      selectStudentsErrMessage(state) && selectCoursesErrMessage(state),
    courseList: selectCourseListForPreview(state)
  };
};

export default compose(
  connect(mapStateToProps, {
    setModalOpen,
    setStudentToUpdate
  }),
  WithSpinner
)(Students);
