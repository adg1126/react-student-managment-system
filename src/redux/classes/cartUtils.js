export const convertClassesToSnapshotToMap = collection =>
  collection.docs.map(doc => {
    const { courseCode, courseName, units, students } = doc.data();

    return {
      courseCode,
      courseName,
      units,
      students
    };
  });

export const removeClassFromClassList = (classList, courseCode) => {
  const existingClass = classList.find(
    classItem => classItem.courseCode === courseCode
  );

  return existingClass
    ? classList.filter(classItem => classItem.courseCode !== courseCode)
    : [...classList];
};
