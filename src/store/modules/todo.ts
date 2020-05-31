import {ActionType} from 'typesafe-actions';
import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import {produce} from 'immer';
import {fetchTodo} from "../../support/api/TodoApi";
import {Todo} from "../../models/Todo";
import {AsyncState} from "../../models/redux/AsyncState";
/*

//1. 각 모듈별 함수 구분을 위한 prefix 각 모듈 파일명 + '/' 의 조합으로 구성한다.
const prefix: string = 'todo/';

//const ASYNC_TOGO = asyncActionCreator(`${prefix}ASYNC_TOGO`);

//3. 액션 함수에 대해서 정의한다.
//export const getAsyncTodo = asyncAction<string, Todo, string>(ASYNC_TOGO);
export const changeTodoTitle = createAction<String>(`${prefix}CHANGE_TODO_TITLE`);

//4. saga 비동기 관련 함수가 필요할 경우 작성 한다. (optional) saga함수들의 모음은 최하단에 나열합니다.
//const getAsyncTodoSaga = createAsyncSaga(getAsyncTodo, fetchTodo);

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
    /!*  [ASYNC_TOGO.REQUEST]: (state) => produce(state, draft => {
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
      }),*!/
});


export default createReducer(initialState, {
    [changeTodoTitle.type]: (state, action) => {
        state.todo.data.title = action.payload;
    },
});
*/

export type TodoState = {
    todo: AsyncState<Todo>
}


const todo = createSlice({
    name: 'todo', //  모듈 네이밍 설정
    initialState: { // 초기 state 세팅
        todo: {
            loading: false,
            data: {
                title: '',
                content: ''
            },
        }
    } as TodoState, // 타입 설정
    reducers: { // reducers 세팅.
        changeTodoTitle: (state, action: PayloadAction<String>) => {
            state.todo.data.title = action.payload;
        }
    }
});

export default todo;





