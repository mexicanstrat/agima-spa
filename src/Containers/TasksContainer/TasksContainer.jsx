import React from 'react';
import { Task } from '../../Components/Task/Task'
import './TasksContainer.css'

/**
 * Контейнер блока задач
 * @param {Array} tasksElements Массив с выбранными задачами
 * @param {String} currentTime Текущее время для проверки выполненности задачи
 * @param {Boolean} completed Переключатель класса для выполненных задач
 * @param {Function} deleteTask Обработчик удаления задачи
 * @param {Function} changeCurrentTaskAndTime Обработчик изменения содержимого существующей задачи
 * @param {String} activeDay Выбранный день недели
 * @param {Boolean} sorting Переключатель состояния сортировки для выполнения анимации
 * @param {String} lockedActiveDay Заблокированный сегодняшний день для пометки выполненных заданий только сегодня
 * @param {Boolean} formError Переключатель состояния ошибки
 * @param {Function} changeTime Обработчик поля времени в форме
 * @param {Function} changeTask Обработчик поля задачи в форме
 * @param {Function} handleClick Обработчик клика по кнопке "+"
 * @param {Function} handleKeyUp Обработчик нажатия клавиши "Enter"
*/

export class TasksContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: this.props.getTime(),
    }
  }

  render() {
    let state = this.props

    let today = state.activeDay

    let tasksElements = state.tasks[today].map(el => <Task
      key={el.id} 
      {...el}
      completed={(el.time <= this.state.currentTime) ? true : false}
      deleteTask={state.deleteTask}
      changeCurrentTaskAndTime={state.changeCurrentTaskAndTime}
      activeDay={state.activeDay}
      sorting={state.sorting}
      lockedActiveDay={state.lockedActiveDay}
    />)

    return (
      <div className="TasksContainer">
        <div className="TasksContainer__moveButton" draggable="true" >*</div>
        <div className="TasksContainer__tasksWrap">
          {tasksElements}
        </div>
        <div className="TasksContainer__form">
          <input
            type="text"
            value={state.timeInput}
            placeholder={state.formValidation.formError ? "format (hh:mm)" : "Time"}
            onChange={({ currentTarget: { value } }) => this.props.changeTime(value)}
            className={`TasksContainer__formInput ${state.formValidation.formError ? "TasksContainer__formInput_error" : null}`}
            onKeyUp={this.props.handleKeyUp}
          />
          <input
            type="text"
            value={state.textInput}
            autoFocus
            placeholder="Task"
            onChange={({ currentTarget: { value } }) => this.props.changeTask(value)}
            className="TasksContainer__formInput"
            onKeyUp={this.props.handleKeyUp}
          />
          <button className="TasksContainer__formButton" onClick={this.props.handleClick}>+</button>
        </div>
      </div>
    )
  }
}