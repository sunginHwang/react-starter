import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchTodo} from "../../support/api/TodoApi";
import {Todo} from "../../models/Todo";
import {AsyncState} from "../../models/redux/AsyncState";

export type TodoState = {
    todo: AsyncState<Todo>
}

const name = 'todo';

const initialState : TodoState = { // 초기 state 세팅
    todo: {
        loading: false,
        data: {
            title: '',
            content: ''
        },
    }
}

export const fetchTodoAction = createAsyncThunk(
    `${name}/fetchTodo`,
    async (content: String)  => {
        return (await fetchTodo(content)) as Todo;
    }
)

const todo = createSlice({
    name, //  모듈 네이밍 설정
    initialState, // 타입 설정
    reducers: { // reducers 세팅.
        changeTodoTitle: (state, action: PayloadAction<String>) => {
            state.todo.data.title = action.payload;
        }
    },
    extraReducers : builder => {
        builder.addCase(fetchTodoAction.pending, (state => {
            state.todo.loading = true;
        }))
        builder.addCase(fetchTodoAction.fulfilled, (state, action: PayloadAction<Todo>) => {
            state.todo.loading = false;
            state.todo.data = action.payload;
        })
        builder.addCase(fetchTodoAction.rejected, (state => {
            state.todo.loading = false;
            state.todo.data = initialState.todo.data;
        }))
    }
});

export default todo;





