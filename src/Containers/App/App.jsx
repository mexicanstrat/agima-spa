import React, { Component } from 'react';
import { TasksContainer } from '../TasksContainer/TasksContainer'
import { Days } from '../../Components/Days/Days'
import './App.css'

/**
 * Контейнер по отрисовке компонентов приложения + список заданий и логика
 * @param {Array} days Массив с днями недели
 * @param {String} activeDay Выбранный день недели (по умолчанию - сегодняшний день)
 * @param {String} lockedActiveDay Заблокированный сегодняшний день для пометки выполненных заданий только сегодня
 * @param {Object} tasks Объект с задачами
 * @param {String} timeInput Поле ввода времени
 * @param {String} textInput Поле ввода заданий
 * @param {Boolean} sorting Переключатель состояния сортировки для выполнения анимации
 * @param {Object} formValidation Объект с паттерном для проверки правильности введенного времени и переключателем состояния ошибки
*/

export class App extends Component {
    state = {
        days: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
        activeDay: "вс",
        lockedActiveDay: "вс",
        tasks: {
            "пн": [{ id: 0, time: "13:45", task: "Обедать" }, { id: 1, time: "19:45", task: "Спать" }],
            "вт": [{ id: 0, time: "16:45", task: "Смотреть мультики" }, { id: 1, time: "00:02", task: "Спать" }],
            "ср": [{ id: 0, time: "15:45", task: "Позвонить бабушке, дедушке" }],
            "чт": [],
            "пт": [],
            "сб": [],
            "вс": [{ id: 0, time: "12:45", task: "Гладить кота" }],
        },
        timeInput: "",
        textInput: "",
        sorting: false,
        formValidation: { pattern: /^(([0,1][0-9])|(2[0-3])):[0-5][0-9]$/, formError: false }
    }

    componentDidMount() {
        //обработчик инициализации приложения
        this.setState({
            ...this.state,
            activeDay: this.getToday(),
            lockedActiveDay: this.getToday(),
        })
        //вариант, если в хранилище есть данный которые можно подтянуть
        if (localStorage.getItem('tasks')) {
            this.setState({
                ...this.state,
                activeDay: this.getToday(),
                lockedActiveDay: this.getToday(),
                tasks: JSON.parse(localStorage.getItem('tasks'))
            })
        }
    }

    componentDidUpdate() {
        //сохранение изменений компонента в локальное хранилище
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks))
    }

    /**
     * @param {Function} getToday Получение сегодняшнего дня недели
     * @param {Function} getTime Получение текущего времени
     * @param {Function} changeActiveDay Обработчик смены дня недели
     * @param {Function} changeTime Обработчик поля времени в форме
     * @param {Function} changeTask Обработчик поля задачи в форме
     * @param {Function} handleClick Обработчик клика по кнопке "+"
     * @param {Function} handleKeyUp Обработчик нажатия клавиши "Enter"
     * @param {Function} sortTasks Функция, сортирующая задачи по времени
     * @param {Function} getErrorFormTask Функция, добавляющая состояние ошибке полю ввода времени
     * @param {Function} addTask Обработчик добавления новой задачи
     * @param {Function} deleteTask Обработчик удаления задачи
     * @param {Function} changeCurrentTaskAndTime Обработчик изменения содержимого существующей задачи
     * @param {Function} onDragEnter Обработчик копирования задач на другой день
    */

    getToday() {
        return (new Date().getDay() - 1) < 0 ? this.state.days[6] : this.state.days[new Date().getDay() - 1]
    }

    getTime() {
        return new Date().toLocaleTimeString().slice(0, -3)
    }

    changeActiveDay(day) {
        this.setState({
            ...this.state,
            activeDay: day
        })
    }

    changeTime(time) {
        this.setState({
            ...this.state,
            timeInput: time
        })
    }

    changeTask(task) {
        this.setState({
            ...this.state,
            textInput: task
        })
    }

    handleClick() {
        //состояние формы, когда поля пустые (сортировка)
        if (this.state.textInput === "" && this.state.timeInput === "") {
            this.sortTasks()
            //состояние формы, когда неправильно введено время
        } else if (!this.state.formValidation.pattern.test(this.state.timeInput)) {
            this.getErrorFormTask()
            //когда все правильно
        } else {
            this.addTask(this.state.timeInput, this.state.textInput, this.state.activeDay)
            setTimeout(() => this.setState({
                ...this.state,
                textInput: "",
                timeInput: "",
                formValidation: {
                    ...this.state.formValidation,
                    formError: false
                }
            }), 0)
        }
    }

    handleKeyUp(event) {
        if (event.keyCode === 13) {
            this.handleClick()
        }
    }

    sortTasks() {
        //убираем форму ошибки (если она есть) и запускаем состояние сортировки
        this.setState({
            ...this.state,
            sorting: true,
            timeInput: "",
            formValidation: {
                ...this.state.formValidation,
                formError: false
            }
        })
        //добавлеяем отсортированные задчи
        setTimeout(() => this.setState({
            ...this.state,
            tasks: {
                ...this.state.tasks,
                [this.state.activeDay]: [
                    ...this.state.tasks[this.state.activeDay].sort((a, b) => a.time > b.time ? 1 : -1)
                ]
            }
        }), 0)
        //отключаем состояние сортировки
        setTimeout(() => this.setState({
            ...this.state,
            sorting: false,
        }), 400)
    }

    getErrorFormTask() {
        this.setState({
            ...this.state,
            timeInput: "",
            formValidation: {
                ...this.state.formValidation,
                formError: true
            }
        })
    }

    addTask(time, text, day) {
        this.setState({
            ...this.state,
            tasks: {
                ...this.state.tasks,
                [day]: [
                    ...this.state.tasks[day],
                    {
                        id: this.state.tasks[day].length !== 0 ? this.state.tasks[day].length : 0,
                        time: time, task: text
                    }
                ]
            }
        })
    }

    deleteTask(id) {
        const index = this.state.tasks[this.state.activeDay].map(task => task.id).indexOf(id)
        this.setState(state => {
            let tasks = state.tasks[this.state.activeDay]
            tasks.splice([index], 1)
            return tasks
        })
    }

    changeCurrentTaskAndTime(id, type, value) {
        const index = this.state.tasks[this.state.activeDay].map(task => task.id).indexOf(id)
        this.setState(state => {
            let tasks = state.tasks[this.state.activeDay][index]
            tasks[type] = [value]
            return tasks
        })
    }

    onDragEnter(day) {
        let newTasks = this.state.tasks[this.state.activeDay]
        this.setState({
            ...this.state,
            tasks: {
                ...this.state.tasks,
                [day]: [
                    ...newTasks
                ]
            }
        })
    }

    render() {
        this.changeActiveDay = this.changeActiveDay.bind(this);
        this.changeTime = this.changeTime.bind(this);
        this.changeTask = this.changeTask.bind(this);
        this.handleClick = this.handleClick.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.changeCurrentTaskAndTime = this.changeCurrentTaskAndTime.bind(this)
        this.onDragEnter = this.onDragEnter.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)

        return (
            <div className="App">
                <TasksContainer
                    {...this.state}
                    getTime={this.getTime}
                    changeTime={this.changeTime}
                    changeTask={this.changeTask}
                    handleClick={this.handleClick}
                    deleteTask={this.deleteTask}
                    changeCurrentTaskAndTime={this.changeCurrentTaskAndTime}
                    onDragEnter={this.onDragEnter}
                    handleKeyUp={this.handleKeyUp}
                />
                <Days
                    days={this.state.days}
                    activeDay={this.state.activeDay}
                    changeActiveDay={this.changeActiveDay}
                    onDragEnter={this.onDragEnter}
                />
            </div>
        )
    }
}


