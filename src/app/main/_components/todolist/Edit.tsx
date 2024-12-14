import { useCallback, useEffect, useState } from 'react';
import { ToDoEditProps } from '../../_interface/MainInterface';
import style from '../../../../../styles/main/todolist.module.css';
import { alertTitle } from '../../../../../util/alert';

const ToDoEdit: React.FC<ToDoEditProps> = ({ selectedTodo, onUpdate }) => {
    const [value, setValue] = useState('');
    const todoDTO = { id: selectedTodo!.id, title: value };

    const onChange = useCallback((e: any) => {
        setValue(e.target.value);
    }, []);

    const onSubmit = useCallback(
        (e: any) => {
            if (!value) {
                alertTitle("빈 칸은 수정이 안됩니다.");
            } else {
                onUpdate(todoDTO);
                setValue('');
            }
            e.preventDefault();
        },
        [onUpdate, value, selectedTodo],
    );

    useEffect(() => {
        if (selectedTodo) {
            setValue(selectedTodo.title);
        }
    }, [selectedTodo]);

    return (
        <div className={style.background}>
            <form onSubmit={onSubmit} className={style.todoedit__insert}>
                <h2>수정하기</h2>
                <input
                    onChange={onChange}
                    value={value}
                    placeholder="할 일을 입력하세요"
                />
                <button type="submit">수정하기</button>
            </form>
        </div>
    );
};

export default ToDoEdit;
