import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger'

// const logger = createLogger({
//     predicate: (getState, action) => action.type === "UPDATE_SELECTED_ADDRESS",
//     duration: true,
//     level: "info",
// });

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
