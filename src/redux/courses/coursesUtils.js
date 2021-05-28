import _ from 'lodash';

export const convertCoursesSnapshotToMap = course => {
  const transformedCollection = course.docs.map(doc => {
    const { courseCode, courseName, schedule } = doc.data();

    return {
      docId: doc.id,
      courseCode,
      courseName,
      schedule
    };
  });

  return _.mapKeys(transformedCollection, 'docId');
};
