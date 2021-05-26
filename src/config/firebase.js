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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.log(err);
    }
  }

  return userRef;
};

export const getClassRef = async courseCode => {
  const classesRef = firestore
    .collection('classes')
    .where('courseCode', '==', courseCode);
  const snapshot = await classesRef.get();

  if (!snapshot.empty) return snapshot.docs[0].ref;
};

export const firestore = firebase.firestore();
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
