import { combineReducers } from 'redux';

import { authReducer } from './auth/authReducer';
import { withReduxStateSync } from 'redux-state-sync';
import { postAuthReducer } from './auth/postAuthRecuder';

const rootReducer = combineReducers({
    auth: authReducer,
    account: postAuthReducer,
})

export default withReduxStateSync(rootReducer)