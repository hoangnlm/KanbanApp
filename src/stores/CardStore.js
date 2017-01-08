import AppDispatcher from "../AppDispatcher"
import constants from "../constants"
import {ReduceStore} from "flux/utils"
import update from "immutability-helper"

let rollback

class CardStore extends ReduceStore {
    getInitialState() {
        return []
    }

    getCards() {
        return this.getState()
    }

    getCard(id) {
        return this.getState().find(card => card.id === id)
    }

    getCardIndex(id) {
        return this.getState().findIndex(card =>card.id === id)
    }

    getTaskIndex(taskId, cardId) {
        let cardIndex = this.getCardIndex(cardId)
        return this.getState()[cardIndex].tasks.findIndex(task => task.id === taskId)
    }

    reduce(state, action) {
        let cardIndex, taskIndex
        switch (action.type) {
            case constants.FETCH_CARDS_SUCCESS:
                return action.payload.res

            /*
             * Card Creation
             */
            case constants.CREATE_CARD:
                rollback = state
                return update(state, {$push: [action.payload.card]})
            case constants.CREATE_CARD_SUCCESS:
                cardIndex = this.getCardIndex(action.payload.card.id)
                return update(state, {
                    [cardIndex]: {id: {$set: action.payload.res.id}}
                })
            case constants.CREATE_CARD_FAILURE:
                return rollback

            /*
             * Card Update
             */
            case constants.UPDATE_CARD:
                rollback = state
                cardIndex = this.getCardIndex(action.payload.card.id)
                return update(state, {
                    [cardIndex]: {$set: action.payload.card}
                })
            case constants.UPDATE_CARD_FAILURE:
                return rollback

            /*
             * Card Status Toggle
             */
            case constants.TOGGLE_CARD_DETAILS:
                cardIndex = this.getCardIndex(action.payload.cardId)
                return update(state, {
                    [cardIndex]: {
                        showDetails: {$apply: currentValue => currentValue === undefined ? true: !currentValue}
                    }
                })

            /*
             * Card Drag n Drop
             */
            case constants.UPDATE_CARD_STATUS:
                // rollback = state
                cardIndex = this.getCardIndex(action.payload.cardId)
                return update(state, {
                    [cardIndex]: {
                        status: {$set: action.payload.status}
                    }
                })
            case constants.UPDATE_CARD_POSITION:
                cardIndex = this.getCardIndex(action.payload.cardId)
                let card = this.getState()[cardIndex]
                let afterIndex = this.getCardIndex(action.payload.afterId)
                return update(state, {
                    $splice: [
                        [cardIndex, 1],
                        [afterIndex, 0, card]
                    ]
                })
            case constants.PERSIST_CARD_DRAG_SUCCESS:
                console.log("PERSIST_CARD_DRAG_SUCCESS")
                return state

            /*
             * Task Creation
             */
            case constants.CREATE_TASK:
                rollback = state
                cardIndex = this.getCardIndex(action.payload.cardId)
                return update(state, {
                    [cardIndex]: {
                        tasks: {$push: [action.payload.task]}
                    }
                })
            case constants.CREATE_TASK_SUCCESS:
                cardIndex = this.getCardIndex(action.payload.cardId)
                taskIndex = this.getTaskIndex(action.payload.task.id, action.payload.cardId)
                return update(state, {
                    [cardIndex]: {
                        tasks: {
                            [taskIndex]: {
                                id: {$set: action.payload.res.id}
                            }
                        }
                    }
                })
            case constants.CREATE_TASK_FAILURE:
                return rollback

            /*
             * Task Deletion
             */
            case constants.DELETE_TASK:
                rollback = state
                cardIndex = this.getCardIndex(action.payload.cardId)
                taskIndex = this.getTaskIndex(action.payload.taskId, action.payload.cardId)
                return update(state, {
                    [cardIndex]: {
                        tasks: {$splice: [[taskIndex, 1]]}
                    }
                })
            case constants.DELETE_TASK_FAILURE:
                return rollback

            /*
             * Task Toggling
             */
            case constants.TOGGLE_TASK:
                cardIndex = this.getCardIndex(action.payload.cardId)
                taskIndex = this.getTaskIndex(action.payload.task.id, action.payload.cardId)
                return update(state, {
                    [cardIndex]: {
                        tasks: {
                            [taskIndex]: {$set: action.payload.task}
                        }
                    }
                })
            case constants.TOGGLE_TASK_FAILURE:
                return rollback

            default:
                return state
        }
    }
}

export default new CardStore(AppDispatcher)
