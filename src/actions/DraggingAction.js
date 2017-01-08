/**
 * Created by Hoang on 12/7/16.
 */
import AppDispatcher from "../AppDispatcher"
import constants from "../constants"
// import throttle from "../utils"

let DraggingAction = {
    updateDraggingSource(draggingSource){
        AppDispatcher.dispatch({
            type: constants.UPDATE_DRAGGING_SOURCE,
            payload: {draggingSource}
        })
    }
}

export default DraggingAction
