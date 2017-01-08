/**
 * Created by Hoang on 12/7/16.
 */
import AppDispatcher from "../AppDispatcher"
import constants from "../constants"
import {ReduceStore} from "flux/utils"

class DraggingStore extends ReduceStore{
    getInitialState(){
        return {
            type: undefined
            , id: undefined
        }
    }

    getDraggingSource(){
        return this.getState()
    }

    reduce(state, action){
        switch (action.type){
            case constants.UPDATE_DRAGGING_SOURCE:
                return {
                    type: action.payload.draggingSource.type
                    , id: action.payload.draggingSource.id
                }
            default:
                return state
        }
    }
}

export default new DraggingStore(AppDispatcher)