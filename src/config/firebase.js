import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA9gLyqwpCUiAHfkF6Jj-9KLgL8KfI-i1o',
  authDomain: 'react-student-management.firebaseapp.com',
  projectId: 'react-student-management',
  storageBucket: 'react-student-management.appspot.com',
  messagingSenderId: '293832139595',
  appId: '1:293832139595:web:6f2cf77ce1ad2574247ece'
};

firebase.initializeApp(firebaseConfig);

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

export const firestore = firebase.firestore();

export default firebase;
