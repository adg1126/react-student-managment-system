import moment from 'moment';
import _ from 'lodash';

// let classDates = [];

export const getClassDates = (startDate, endDate, daysObj, courseCode) => {
  let start = moment(startDate, 'YYYY-MM-DD'), // Sept. 1st
    end = moment(endDate),
    classDates = []; // Nov. 2nd

  for (const [k, v] of Object.entries(daysObj)) {
    let currentDay = start.clone().day(k);

    while (currentDay.add(7, 'd').isBefore(end)) {
      classDates.push({
        title: courseCode,
        startDate: moment(
          `${currentDay.clone().format('YYYY-MM-DD')} ${v.startTime}`
        ).toDate(),
        endDate: moment(
          `${currentDay.clone().format('YYYY-MM-DD')} ${v.endTime}`
        ).toDate()
      });
    }
  }

  return classDates;
};

export const convertAttendanceSnapshotToMap = course => {
  const transformedCollection = course.docs.map(doc => {
    const { classDates, courseId, userId } = doc.data();

    return {
      docId: doc.id,
      classDates: classDates.map(cd => ({
        title: cd.title,
        startDate: cd.startDate.toDate(),
        endDate: cd.endDate.toDate()
      })),
      courseId,
      userId
    };
  });

  return _.mapKeys(transformedCollection, 'docId');
};
