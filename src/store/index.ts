import {applyMiddleware, createStore} from 'redux';
import reducers from './modules';
import {all} from 'redux-saga/effects';
import {todoSaga} from './modules/todo';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from "redux-devtools-extension";

function* rootSaga() {
    yield all([todoSaga()]);
}


const initStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));
    sagaMiddleware.run(rootSaga);
    return store;
};

export default initStore;

