import moment from 'moment';
import _ from 'lodash';

export const getClassDates = (
  startDate,
  endDate,
  daysObj,
  courseCode,
  courseStudents
) => {
  let start = moment(startDate, 'YYYY-MM-DD'),
    end = moment(endDate),
    classDates = [];

  for (const [k, v] of Object.entries(daysObj)) {
    let currentDay = start.clone().day(k);

    while (currentDay.add(7, 'd').isBefore(end)) {
      let id = _.uniqueId(`${courseCode}_`),
        title = courseCode,
        startDate = moment(
          `${currentDay.clone().format('YYYY-MM-DD')} ${v.startTime}`
        ).toDate(),
        endDate = moment(
          `${currentDay.clone().format('YYYY-MM-DD')} ${v.endTime}`
        ).toDate();

      classDates.push({
        id,
        title,
        startDate,
        endDate,
        ...(courseStudents && { students: courseStudents })
      });
    }
  }

  return classDates;
};

export const convertAttendanceSnapshotToMap = course => {
  const transformedCollection = course.docs.map(doc => {
    const { classDates, courseId, userId, courseCode } = doc.data();

    return {
      docId: doc.id,
      classDates: classDates.map(cd => ({
        ...cd,
        startDate: cd.startDate.toDate(),
        endDate: cd.endDate.toDate()
      })),
      courseId,
      userId,
      courseCode
    };
  });

  return _.mapKeys(transformedCollection, 'docId');
};
