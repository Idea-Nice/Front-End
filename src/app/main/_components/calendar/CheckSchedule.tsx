import React, { useEffect, useState } from 'react';
import style from '../../../../../styles/main/calendar.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store/store';
import { deleteCalendarAPI, getCalendarAPI } from '../../../../../store/main/calendarAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faX } from '@fortawesome/free-solid-svg-icons';
import { CheckScheduleProps, Schedule } from '../../_interface/MainInterface';
import Swal from 'sweetalert2';
import { response } from '../../../../../util/response';
import { error } from '../../../../../util/error';

const CheckSchedule: React.FC<CheckScheduleProps> = ({ setIsViewingSchedule, myDate, setMyDate }) => {

    const dispatch = useDispatch<AppDispatch>();
    const userId = window.localStorage.getItem('userId');

    const selectSchedule = () => {
        dispatch(getCalendarAPI(userId!))
            .unwrap()
            .then((response) => {
                setMyDate(response);
            })
            .catch(console.error);
    }

    useEffect(() => {
        selectSchedule();
    }, [setIsViewingSchedule, myDate])

    const formatDateToString = (dateString: string) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}-${day}`;
    };


    const deleteCalendar = (id: any) => {
        Swal.fire({
            text: "일정을 삭제하시겠습니까?",
            showCancelButton: true,
            confirmButtonText: "네",
            cancelButtonText: "아뇨"
        }).then(click => {
            if (click.isConfirmed) {
                dispatch(deleteCalendarAPI(id))
                    .unwrap()
                    .then((result) => {
                        response(result);
                        setMyDate((prev) => prev.filter(schedule => schedule.id !== id));
                    })
                    .catch((err) => {
                        error(err);
                    });
            }
        });
    }

    return (
        <>
            <div className={style.check_schedule_div} onClick={(e) => e.stopPropagation()}>
                <div className={style.check_schedule_header}>
                    <p className={style.check_schedule_top}>일정</p>
                    <FontAwesomeIcon icon={faX} color='white' className={style.check_schedule_close} onClick={() => setIsViewingSchedule(false)} />
                </div>
                <div className={style.check_schedule_main_div}>
                    {myDate && myDate.length > 0 ? (
                        myDate.map((schedule: Schedule) => (
                            <div key={schedule.id} className={style.check_schedule_content_div}>
                                <div className={style.check_schedule_top_div}>
                                    <div className={style.check_schedule_date_div}>
                                        <p>{formatDateToString(schedule.startDay)} ~ {formatDateToString(schedule.endDay)}</p>
                                    </div>
                                    <FontAwesomeIcon icon={faTrashCan} size='2x' onClick={() => deleteCalendar(schedule.id)} className={style.schedule_delete} />
                                </div>
                                <p className={style.check_schedule_content}>{schedule.title}</p>
                            </div>
                        ))
                    ) : (
                        <p>일정이 없습니다.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default CheckSchedule;