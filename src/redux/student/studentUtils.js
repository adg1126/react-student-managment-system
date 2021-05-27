import _ from 'lodash';

export const convertStudentsSnapshotToMap = student => {
  const transformedCollection = student.docs.map(doc => {
    const { fullName, courses } = doc.data();

    return {
      docId: doc.id,
      fullName,
      courses
    };
  });

  return _.mapKeys(transformedCollection, 'docId');
};
