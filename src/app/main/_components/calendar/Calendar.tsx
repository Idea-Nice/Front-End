import React, { useState } from 'react';
import style from '../../../../../styles/main/calendar.module.css';
import { ModalProps, Schedule } from '../../_interface/MainInterface';
import CheckSchedule from './CheckSchedule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import React_Calendar from "react-calendar";
import AddSchedule from './AddSchedule';

const Calendar: React.FC<ModalProps> = ({ isModalOpen, closeModal }) => {

    const [myDate, setMyDate] = useState<Schedule[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isAddingSchedule, setIsAddingSchedule] = useState(false);
    const [isViewingSchedule, setIsViewingSchedule] = useState(false);

    if (!isModalOpen) return null;

    return (
        <>
            {isViewingSchedule ? <CheckSchedule setIsViewingSchedule={setIsViewingSchedule} myDate={myDate} setMyDate={setMyDate} /> : null}
            <div className={style.main_div} onClick={(e) => e.stopPropagation()}>
                <div className={style.header}>
                    <p className={style.react_calendar_check_schedule} onClick={() => { setIsViewingSchedule(true) }}>일정</p>
                    <FontAwesomeIcon icon={faX} color='white' className={style.modal_out} onClick={closeModal} />
                </div>
                <React_Calendar
                    onChange={(date: any) => setSelectedDate(date)}
                    value={selectedDate}
                    calendarType="gregory"
                    minDetail="year"
                    prev2Label={null}
                    next2Label={null}
                    showNeighboringMonth={true}
                />
                <p className='react_calendar_plus_schedule' onClick={() => setIsAddingSchedule(true)}>일정 추가</p>
            </div >
            {isAddingSchedule ? <AddSchedule setIsAddingSchedule={setIsAddingSchedule} myDate={myDate} setMyDate={setMyDate} /> : null
            }
        </>
    )
}

export default Calendar;