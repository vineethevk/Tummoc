import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const rootreducer = combineReducers({});

const store = createStore(rootreducer, applyMiddleware(thunk));
export default store