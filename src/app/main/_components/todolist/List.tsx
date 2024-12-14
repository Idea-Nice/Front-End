import React from 'react';
import ToDoListItem from './Item';
import { TodoListProps } from '../../_interface/MainInterface';
import style from '../../../../../styles/main/todolist.module.css';

const TodoList: React.FC<TodoListProps> = ({
    todos,
    onRemove,
    onToggle,
    onChangeSelectedTodo,
    onInsertToggle,
}) => {

    return (
        <div
            className={style.list}
        >
            {todos.map((todo) => (
                <ToDoListItem
                    key={todo.id}
                    todo={todo}
                    onToggle={(completed: boolean) => onToggle({ id: todo.id, completed: completed })}
                    onRemove={onRemove}
                    onInsertToggle={onInsertToggle}
                    onChangeSelectedTodo={onChangeSelectedTodo}
                />
            ))}
        </div>
    );
};

export default React.memo(TodoList);
