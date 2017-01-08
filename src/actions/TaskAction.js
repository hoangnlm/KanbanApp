import AppDispatcher from "../AppDispatcher"
import constants from "../constants"
import KanbanApi from "../api/KanbanApi"

let TaskAction = {
    addTask(task, cardId) {
        AppDispatcher.dispatchAsync(KanbanApi.addTask(task, cardId), {
            req: constants.CREATE_TASK
            , success: constants.CREATE_TASK_SUCCESS
            , failure: constants.CREATE_TASK_FAILURE
        }, {task, cardId})
    }
    , deleteTask(task, cardId) {
        AppDispatcher.dispatchAsync(KanbanApi.deleteTask(task, cardId), {
            req: constants.DELETE_TASK
            , success: constants.DELETE_TASK_SUCCESS
            , failure: constants.DELETE_TASK_FAILURE
        }, {task, cardId})
    }
    , toggleTask(task, cardId) {
        AppDispatcher.dispatchAsync(KanbanApi.toggleTask(task, cardId), {
            req: constants.TOGGLE_TASK
            , success: constants.TOGGLE_TASK_SUCCESS
            , failure: constants.TOGGLE_TASK_FAILURE
        }, {task, cardId})
    }
}

export default TaskAction
