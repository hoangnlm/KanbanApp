import "whatwg-fetch"
import "babel-polyfill"

const API_URL = "http://kanbanapi.pro-react.com"
const API_HEADERS = {
    "Content-Type": "application/json",
    "Authorization": "hehehe 999999999"
}

let KanbanApi = {
    fetchCards(){
        return fetch(`${API_URL}/cards`, {headers: API_HEADERS})
            .then(res => res.json())
            .then(resData => {
                // Sap xep tang dan theo cardId va taskId
                // resData.sort((card1, card2) => card1.id - card2.id)
                // resData.forEach(card => card.tasks.sort((task1, task2) => task1.id - task2.id))
                return resData
            })
    }

    /*
     * Xu ly card
     */
    , addCard(card){
        return fetch(`${API_URL}/cards`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(card)
        })
            .then(res => res.ok ? res.json() : new Error("Server response is not OK."))
    }
    , updateCard(card){
        return fetch(`${API_URL}/cards/${card.id}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify(card)
        })
            .then(res => res.ok || new Error("Server response is not OK."))
    }
    , persistCardDrag(cardId, status, index) {
        // console.log("persistCardDrag")
        return fetch(`${API_URL}/cards/${cardId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({status, row_order_position: index})
        })
            .then(res => res.ok || new Error("Server response is not OK."))
    }

    /*
     * Xu ly task
     */
    , addTask(task, cardId) {
        return fetch(`${API_URL}/cards/${cardId}/tasks`, {
            method: "post"
            , headers: API_HEADERS
            , body: JSON.stringify(task)
        })
            .then(res => res.ok ? res.json() : new Error("Server response is not OK."))
    }
    , deleteTask(task, cardId) {
        return fetch(`${API_URL}/cards/${cardId}/tasks/${task.id}`, {
            method: "delete",
            headers: API_HEADERS
        })
            .then(res => res.ok || new Error("Server response is not OK."))
    }
    , toggleTask(task, cardId) {
        return fetch(`${API_URL}/cards/${cardId}/tasks/${task.id}`, {
            method: "put",
            headers: API_HEADERS,
            body: JSON.stringify(task)
        })
            .then(res => res.ok || new Error("Server response is not OK."))
    }
}

export default KanbanApi