import React from 'react';
import style from '../../../../../styles/main/todolist.module.css';
import { ToDoListItemProps } from '../../_interface/MainInterface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSquare, faSquareCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

const ToDoListItem: React.FC<ToDoListItemProps> = ({
  todo,
  onRemove,
  onToggle,
  onChangeSelectedTodo,
  onInsertToggle,
}) => {

  return (
    <div className={style.item_li}>
      <div
        className={todo.completed ? style.checkbox_on : style.checkbox_off}
        onClick={() => todo.completed === false && onToggle(true)}
      >
        {todo.completed ?
          <FontAwesomeIcon icon={faSquareCheck} className={style.check} />
          :
          <FontAwesomeIcon icon={faSquare} className={style.noncheck} />}
        <div className={style.text}>{todo.title}</div>
      </div>
      {!todo.completed && (
        <FontAwesomeIcon
          icon={faPenToSquare}
          className={style.edit}
          onClick={() => {
            onChangeSelectedTodo(todo);
            onInsertToggle();
          }}
        />
      )}
      <FontAwesomeIcon
        icon={faTrash}
        className={style.remove}
        onClick={() => onRemove(todo.id)}
      />
    </div >
  );
};

export default React.memo(ToDoListItem);
