import {Dispatcher} from "flux"
import "babel-polyfill"

class AppDispatcher extends Dispatcher {
    dispatch(action = {}) {
        // console.log("Dispatched:", action)
        super.dispatch(action)
    }

    dispatchAsync(promise, types, payload) {
        const {req, success, failure} = types
        this.dispatch({type: req, payload: Object.assign({}, payload)})
        promise.then(
            res => this.dispatch({
                type: success
                , payload: Object.assign({}, payload, {res})
            })
            , error => this.dispatch({
                type: failure
                , payload: Object.assign({}, payload, {error})
            })
        )
    }
}

export default new AppDispatcher()