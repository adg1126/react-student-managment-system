import _ from 'lodash';

export const convertStudentsSnapshotToMap = student => {
  const transformedCollection = student.docs.map(doc => {
    const { fullName, courses, userId } = doc.data();

    return {
      docId: doc.id,
      userId,
      fullName,
      courses
    };
  });

  return _.mapKeys(transformedCollection, 'docId');
};
