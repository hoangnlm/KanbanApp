/**
 * Created by Hoang on 11/18/16.
 */
import React, {Component, PropTypes} from 'react'
import update from "immutability-helper"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import TaskAction from "../actions/TaskAction"

class CheckList extends Component {
    static propTypes = {
        cardId: PropTypes.number
        , tasks: PropTypes.arrayOf(PropTypes.object)
    }

    checkInputKeyPress(e) {
        // console.log("empty string:", boolean.parse("") === false)
        if (e.key === "Enter" && e.target.value.trim()) {
            let newTask = {id: Date.now(), name: e.target.value, done: false}
            TaskAction.addTask(newTask, this.props.cardId)
            e.target.value = ""
        }
    }

    updateTask(task, e) {
        let newTask = update(task, {done: {$set: e.target.checked}})
        TaskAction.toggleTask(newTask, this.props.cardId)
    }

    deleteTask(task, cardId, e) {
        TaskAction.deleteTask(task, cardId)
    }

    render() {
        let tasks = this.props.tasks.map((task, i) => (
            <li className="checklist__task item" key={i}>
                <input
                    id={task.id}
                    type="checkbox"
                    checked={task.done}
                    onChange={this.updateTask.bind(this, task)}
                />
                <label htmlFor={task.id}>{task.name}</label>
                <a href="#" className="checklist__task--remove" onClick={this.deleteTask.bind(this, task, this.props.cardId)}>x</a>
            </li>
        ))

        return (
            <div className="checklist">
                <ul>
                    <ReactCSSTransitionGroup
                        transitionName="example"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                    >
                        {tasks}
                    </ReactCSSTransitionGroup>
                </ul>
                <input
                    className="checklist--add-task"
                    type="text"
                    placeholder="Add task & hit Enter..."
                    onKeyPress={this.checkInputKeyPress.bind(this)}
                />
            </div>
        )
    }
}

export default CheckList;