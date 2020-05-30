import {createReducer, createAction, ActionType} from 'typesafe-actions';
import {takeEvery} from 'redux-saga/effects';
import {produce} from 'immer';
import {createAsyncSaga, asyncAction, asyncActionCreator} from "../../support/utils/reduxUtil";
import {fetchTodo} from "../../support/api/TodoApi";
import {Todo} from "../../models/Todo";
import {AsyncState} from "../../models/redux/AsyncState";

//1. 각 모듈별 함수 구분을 위한 prefix 각 모듈 파일명 + '/' 의 조합으로 구성한다.
const prefix: string = 'todo/';

//2. 액션생성자함수 에 대해서 정의한다.
const CHANGE_TODO_TITLE = `${prefix}CHANGE_TODO_TITLE`;
const ASYNC_TOGO = asyncActionCreator(`${prefix}ASYNC_TOGO`);

//3. 액션 함수에 대해서 정의한다.
export const getAsyncTodo = asyncAction<string, Todo, string>(ASYNC_TOGO);
export const changeTodoTitle = createAction(CHANGE_TODO_TITLE)<string>();

//4. saga 비동기 관련 함수가 필요할 경우 작성 한다. (optional) saga함수들의 모음은 최하단에 나열합니다.
const getAsyncTodoSaga = createAsyncSaga(getAsyncTodo, fetchTodo);

//5. 해당 리듀서의 상태 타입을 정의합니다.
export type TodoState = {
    todo: AsyncState<Todo>
}

//6. 리듀서의 값을 정의합니다.
const initialState: TodoState = {
    todo: {
        loading: false,
        data: {
            title: '',
            content: ''
        },
    }
};

//7. 리듀서를 정의합니다.
export default createReducer<TodoState>(initialState, {
    [CHANGE_TODO_TITLE]: (state, action: ActionType<typeof changeTodoTitle>) =>
        produce(state, draft => {
            draft.todo.data.title = action.payload;
        }),
    [ASYNC_TOGO.REQUEST]: (state) => produce(state, draft => {
        draft.todo.loading = true;
    }),
    [ASYNC_TOGO.SUCCESS]: (state, action: ActionType<typeof getAsyncTodo.success>) => produce(state, draft => {
        draft.todo.loading = false;
        draft.todo.data.title = action.payload.title;
        draft.todo.data.content = action.payload.content;
    }),
    [ASYNC_TOGO.FAILURE]: (state, action: ActionType<typeof getAsyncTodo.failure>) => produce(state, draft => {
        draft.todo.loading = false;
        draft.todo.data = initialState.todo.data;
        draft.todo.error = action.payload;
    }),
});

//8. `4`번에서 작성한 saga함수들에 대해 구독 요청에 대한 정의를 최하단에 해주도록 합니다.
export function* todoSaga() {
    yield takeEvery(ASYNC_TOGO.REQUEST, getAsyncTodoSaga);
}







