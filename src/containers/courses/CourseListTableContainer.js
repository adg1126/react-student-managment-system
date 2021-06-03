import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  selectCourseListForPreview,
  selectIsCoursesFetching
} from '../../redux/courses/coursesSelectors';
import { selectStudentListForPreview } from '../../redux/student/studentSelectors';

import { setModalOpen } from '../../redux/modal/modalActions';
import { setCourseToUpdate } from '../../redux/courses/coursesActions';

import CourseListTable from '../../components/courses/CourseListTable';
import WithSpinner from '../WithSpinner';

const mapStateToProps = state => ({
  courseList: selectCourseListForPreview(state),
  isFetching: selectIsCoursesFetching(state),
  studentList: selectStudentListForPreview(state)
});

export default compose(
  connect(mapStateToProps, { setModalOpen, setCourseToUpdate }),
  WithSpinner
)(CourseListTable);
