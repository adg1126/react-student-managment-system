import _ from 'lodash';

export const convertCoursesSnapshotToMap = course => {
  const transformedCollection = course.docs.map(doc => ({
    docId: doc.id,
    ...doc.data()
  }));

  return _.mapKeys(transformedCollection, 'docId');
};
