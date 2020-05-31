import React from 'react';
import TodoItem from "../components/todo/TodoItem";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../models/redux/RootState";
import todo, {fetchTodoAction} from "../store/modules/todo";

type TodoContainerProps = {}

const TodoContainer = ({}: TodoContainerProps) => {

    const {title, content} = useSelector((state: RootState) => state.todo.todo.data);
    const dispatch = useDispatch();

    const onButtonClick = () => notifySomething('버튼이 변경되었습니다.');

    const notifySomething = (changeTitle: string) => {
        dispatch(todo.actions.changeTodoTitle(changeTitle));
        dispatch(fetchTodoAction(changeTitle));
    }


    return (
        <div>
            <button onClick={onButtonClick}>버튼 변경</button>
            <TodoItem title={title}
                      content={content}/>
            <TodoItem/>
        </div>
    );
};

export default TodoContainer;