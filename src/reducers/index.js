import { combineReducers } from 'redux';
import GeneticReducer from './GeneticReducer';
import CustomerGeneticsReducer from './CustomerGeneticsReducer';

export default combineReducers({
  genetic: GeneticReducer,
  customerGenetics: CustomerGeneticsReducer
});
