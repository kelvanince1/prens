import { GENETIC_UPDATE } from '../actions/types';

// Add date in state object
const initialState = {
  heartRate: ''
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GENETIC_UPDATE:
      // ES6 key interpolation
      return {...state, [action.payload.prop]: action.payload.value }
    default:
      return state;
  }
};
