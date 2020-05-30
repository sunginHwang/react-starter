import React from 'react';
import styled from 'styled-components';

type TodoItemProps = {
    title: string,
    content: string
}

function TodoItem({title, content}: TodoItemProps) {

    const renderTitle = <h3>{title}</h3>;

    return (
        <S.TodoItem>
            {renderTitle}
            <p>{content}</p>
        </S.TodoItem>
    );
};

TodoItem.defaultProps = {
    title: 'todo 콘텐츠 타이틀 기본값 입니다.',
    content: '이건 콘텐츠 기본값 입니다.'
} as TodoItemProps;

export default TodoItem;

const S: any = {
    TodoItem: styled.div`
    width: 20rem;
    height: 10rem;
    background-color: #e8e8e8;
    color: red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  
    h3{
        font-size: 1.6rem;
        color: black;
        margin: 0;
        padding: 0;
    }
    
    
    p{
        font-size: 1.2rem;
        color: black;
    }
  `
};
