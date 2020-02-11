import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key: 'mamago',
  storage
};

const appReducer = combineReducers({});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(ReduxThunk)));

export default store;
