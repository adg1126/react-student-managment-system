import _ from 'lodash';

export const convertCoursesSnapshotToMap = course => {
  const transformedCollection = course.docs.map(doc => {
    const { courseCode, courseName, meetingDays } = doc.data();

    return {
      docId: doc.id,
      courseCode,
      courseName,
      meetingDays
    };
  });

  return _.mapKeys(transformedCollection, 'docId');
};
