import _ from 'lodash';

export const convertClassesToSnapshotToMap = collection => {
  const transformedCollection = collection.docs.map(doc => {
    const { courseCode, courseName, students, schedule } = doc.data();

    return {
      courseCode,
      courseName,
      students,
      schedule
    };
  });

  return _.mapKeys(transformedCollection, 'courseCode');
};
