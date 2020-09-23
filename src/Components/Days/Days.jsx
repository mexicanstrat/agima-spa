import React from 'react'
import './Days.css'

/**
 * Компонент по отрисовке блока с днями недели
 * @param {Array} daysElements Массив с днями недели
 * @param {Function} changeActiveDay Обработчик смены дня недели
 * @param {String} activeDay Выбранный день недели 
 * @param {Function} onDragEnter Обработчик копирования задач на другой день
*/

export const Days = (props) => {
    let daysElements = props.days.map(day => <div
        key={day}
        className={`Days__element ${day === props.activeDay ? "Days__element_active" : null}`}
        onClick={() => props.changeActiveDay(day)}
        onDragEnter={() => props.onDragEnter(day)}
    >{day}</div>)

    return (
        <div>
            {daysElements}
        </div>
    )
}
