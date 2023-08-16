import { combineReducers } from 'redux';
import { withReduxStateSync } from 'redux-state-sync';

import { authenticationReducer } from './auth/authenticationReducer';

const rootReducer = combineReducers({
    auth: authenticationReducer,
})

export default withReduxStateSync(rootReducer)