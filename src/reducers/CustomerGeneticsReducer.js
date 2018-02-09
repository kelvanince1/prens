import { FETCH_GENETICS } from '../actions/types';

// Add date in state object
const initialState = {

};

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_GENETICS:
      return action.payload
    default:
      return state;
  }
};
