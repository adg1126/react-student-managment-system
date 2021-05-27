import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  selectStudentListForPreview,
  selectIsStudentsFetching
} from '../redux/student/studentSelectors';

import { deleteStudent } from '../redux/student/studentActions';
import history from '../history';

import StudentList from '../components/students/StudentList';
import WithSpinner from './WithSpinner';

const mapStateToProps = state => {
  const path = history.location.pathname;
  const classId = path.substring(path.lastIndexOf('/') + 1);
  const studentsArr = selectStudentListForPreview(state);

  return {
    studentList: classId
      ? studentsArr.filter(student =>
          student.courses.every(course => course.includes(classId))
        )
      : studentsArr,
    isFetching: selectIsStudentsFetching(state)
  };
};

export default compose(
  connect(mapStateToProps, { deleteStudent }),
  WithSpinner
)(StudentList);
