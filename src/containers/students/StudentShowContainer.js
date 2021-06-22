import { connect } from 'react-redux';

import {
  selectStudent,
  selectStudentsStatus
} from '../../redux/student/studentSelectors';
import {
  selectCourseListForPreview,
  selectIsCoursesFetching,
  selectCoursesErrMessage
} from '../../redux/courses/coursesSelectors';

import { setModalOpen } from '../../redux/modal/modalActions';
import { setStudentToUpdate } from '../../redux/student/studentActions';

import StudentShow from '../../pages/StudentShow';

const mapStateToProps = (state, ownProps) => ({
  student: selectStudent(ownProps.match.params.studentId)(state),
  isFetching: selectIsCoursesFetching(state),
  errMessage: selectCoursesErrMessage(state),
  courseList: selectCourseListForPreview(state),
  status: selectStudentsStatus(state)
});

export default connect(mapStateToProps, { setModalOpen, setStudentToUpdate })(
  StudentShow
);
