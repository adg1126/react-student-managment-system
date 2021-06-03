import _ from 'lodash';

export const convertCoursesSnapshotToMap = course => {
  const transformedCollection = course.docs.map(doc => {
    const { courseCode, courseName, meetingDays, startDate, endDate } =
      doc.data();

    return {
      docId: doc.id,
      courseCode,
      courseName,
      meetingDays,
      startDate,
      endDate
    };
  });

  return _.mapKeys(transformedCollection, 'docId');
};
