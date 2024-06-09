import { combineReducers } from 'redux';
import sampleReducer from './slices/projectMeeting'; 
import projectReducer from './slices/project'; 

const rootReducer = combineReducers({
  standup: sampleReducer, // Add your reducers here
  project: projectReducer
});

export default rootReducer;
