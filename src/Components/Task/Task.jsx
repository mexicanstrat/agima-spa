import React from 'react';
import './Task.css'

/**
 * Компонент по отрисовке задания
 * @param {Boolean} completed Переключатель класса для выполненных задач
 * @param {String} activeDay Выбранный день недели (по умолчанию - сегодняшний день)
 * @param {String} lockedActiveDay Заблокированный сегодняшний день для пометки выполненных заданий только сегодня
 * @param {Boolean} sorting Переключатель состояния сортировки для выполнения анимации
 * @param {String} time Время задачи
 * @param {String} task Само задание 
 * @param {Function} changeCurrentTaskAndTime Обработчик изменения содержимого существующей задачи
 * @param {Function} deleteTask Обработчик удаления задачи
*/

export const Task = (props) => {
    autosize($('textarea'))
    return (
        <div className={`Task Task_margin 
            ${(props.completed && props.activeDay === props.lockedActiveDay) ? "Task_completed" : null} 
            ${props.sorting ? "animate__animated animate__slideInUp" : null}`}
        >
            <input
                className="Task__time"
                value={props.time}
                onChange={({ currentTarget: { value } }) => props.changeCurrentTaskAndTime(props.id, "time", value)}
            />
            <textarea
                className="Task__text"
                value={props.task}
                onChange={({ currentTarget: { value } }) => props.changeCurrentTaskAndTime(props.id, "task", value)}
            />
            <button onClick={() => props.deleteTask(props.id)}>X</button>
        </div>
    )
}