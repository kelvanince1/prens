import firebase from 'firebase';
import { GENETIC_UPDATE , FETCH_GENETICS } from './types';

export const geneticUpdate = ({ prop, value }) => {
  return {
    type: GENETIC_UPDATE,
    payload: { prop, value }
  };
};

export const createGenetic = ({ heartRate, date }) => {
  return () => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/customers/${currentUser.uid}/heartRate`)
      .push({ heartRate, date })
  };
};

// The .on method below can absolutely be refactored to an ES7 Async/Await promise
export const fetchGenetics = () => {
  return (dispatch) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/customers/${currentUser.uid}/heartRate`)
      .on('value', snapshot => {
        dispatch({ type: FETCH_GENETICS, payload: snapshot.val() })
      });
  };
};
