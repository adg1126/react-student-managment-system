import _ from 'lodash';

export const convertClassesToSnapshotToMap = collection => {
  const transformedCollection = collection.docs.map(doc => {
    const { courseCode, courseName, units, students } = doc.data();

    return {
      courseCode,
      courseName,
      units,
      students
    };
  });

  return _.mapKeys(transformedCollection, 'courseCode');
};
