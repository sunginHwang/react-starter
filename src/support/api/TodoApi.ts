import {Todo} from "../../models/Todo";

export const fetchTodo = (content: string) => {
    return new Promise((resolve) => {
        const people: Todo = {
            title: 'fetch todo title',
            content: 'fetch todo content' + content
        }
        resolve(people)
    });
}