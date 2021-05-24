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

export const getClassRef = async courseCode => {
  const classesRef = firestore
    .collection('classes')
    .where('courseCode', '==', courseCode);
  const snapshot = await classesRef.get();

  if (!snapshot.empty) return snapshot.docs[0].ref;
};

export const firestore = firebase.firestore();

export default firebase;
