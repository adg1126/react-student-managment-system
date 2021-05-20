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

  return transformedCollection.reduce((acc, collection) => {
    acc[collection.courseCode] = collection;
    return acc;
  }, {});
};

export const removeClassFromClassList = (classList, courseCode) => {
  const existingClass = classList.find(
    classItem => classItem.courseCode === courseCode
  );

  return existingClass
    ? classList.filter(classItem => classItem.courseCode !== courseCode)
    : [...classList];
};
