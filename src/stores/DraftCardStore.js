/**
 * Created by Hoang on 11/29/16.
 */
import AppDispatcher from "../AppDispatcher"
import constants from "../constants"
import {ReduceStore} from "flux/utils"
import update from "immutability-helper"

class DraftCardStore extends ReduceStore {
    getInitialState() {
        return {}
    }

    getDraftCard() {
        return this.getState()
    }

    getDefaultDraftCard() {
        return {
            id: Date.now(),
            title: '',
            description: '',
            status: 'todo',
            color: '#c9c9c9',
            tasks: []
        }
    }

    reduce(state, action) {
        switch (action.type) {
            case constants.LOAD_DEFAULT_DRAFT:
                return this.getDefaultDraftCard()
            case constants.CREATE_DRAFT:
                if (action.payload.card) {
                    return update(state, {$set: action.payload.card})
                } else {
                    return this.getDefaultDraftCard()
                }
            case constants.UPDATE_DRAFT:
                return update(state, {
                    [action.payload.field]: {$set: action.payload.value}
                })
            default:
                return state
        }
    }
}

export default new DraftCardStore(AppDispatcher)