import React, { useState } from 'react';
import style from '../../../../../styles/main/calendar.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store/store';
import { getCalendarAPI, makeCalendarAPI } from '../../../../../store/main/calendarAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AddScheduleProps } from '../../_interface/MainInterface';
import { alertTitle } from '../../../../../util/alert';
import { response } from '../../../../../util/response';
import { error } from '../../../../../util/error';

const AddSchedule: React.FC<AddScheduleProps> = ({ setIsAddingSchedule, myDate, setMyDate }) => {

    const dispatch = useDispatch<AppDispatch>();
    const userId = window.localStorage.getItem('userId');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    const saveSchedule = (e: any) => {
        e.preventDefault();

        const titleElement = document.getElementById("schedule_title") as HTMLInputElement | null;
        const title = titleElement?.value.trim();

        if (!title) {
            alertTitle("제목을 입력해주세요");
            return false;
        } else if (!startDate) {
            alertTitle("시작 날짜를 입력해주세요");
            return false;
        } else if (!endDate) {
            alertTitle("종료 날짜를 입력해주세요");
            return false;
        }

        const calendarDTO = {
            userId: userId!,
            title: title,
            startDay: formatDate(startDate),
            endDay: formatDate(endDate)
        };
        dispatch(makeCalendarAPI(calendarDTO))
            .unwrap()
            .then((result) => {
                response(result);
                setMyDate(result);
                if (titleElement) titleElement.value = '';
                setStartDate(null);
                setEndDate(null);
            })
            .catch(err => {
                error(err)
            });
    }

    return (
        <>
            <div className={style.add_schedule_div} onClick={(e) => e.stopPropagation()}>
                <div className={style.add_schedule_top_div}>
                    <p>새로운 일정</p>
                    <FontAwesomeIcon icon={faX} color='white' className={style.add_schedule_close} onClick={() => setIsAddingSchedule(false)} />
                </div>
                <div className={style.add_schedule_title_div}>
                    <p>제목</p>
                    <input type='text' id='schedule_title' placeholder='제목을 입력해주세요' />
                </div>
                <div className={style.add_schedule_date_div}>
                    <div className={style.add_schedule_date_start_div}>
                        <p>시작</p>
                        <DatePicker
                            selected={startDate}
                            onChange={(date: any) => setStartDate(date)}
                            placeholderText='날짜 선택'
                            className={style.date_selector}
                            dateFormat="yyyy. M. d"
                        />
                    </div>
                    <div className={style.add_schedule_date_end_div}>
                        <p>종료</p>
                        <DatePicker
                            selected={endDate}
                            onChange={(date: any) => setEndDate(date)}
                            placeholderText='날짜 선택'
                            className={style.date_selector}
                            dateFormat="yyyy. M. d"
                        />
                    </div>
                </div>
                <p className={style.add_schedule_save} onClick={saveSchedule}>저장</p>
            </div >
        </>
    )

}

export default AddSchedule;