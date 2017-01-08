import AppDispatcher from "../AppDispatcher"
import constants from "../constants"
import KanbanApi from "../api/KanbanApi"
// import throttle from "../utils"
import CardStore from "../stores/CardStore"

let CardAction = {
    fetchCards(){
        AppDispatcher.dispatchAsync(KanbanApi.fetchCards(), {
            req: constants.FETCH_CARDS
            , success: constants.FETCH_CARDS_SUCCESS
            , failure: constants.FETCH_CARDS_FAILURE
        })
    }
    , addCard(card){
        AppDispatcher.dispatchAsync(KanbanApi.addCard(card), {
            req: constants.CREATE_CARD
            , success: constants.CREATE_CARD_SUCCESS
            , failure: constants.CREATE_CARD_FAILURE
        }, {card})
    }
    , updateCard(card) {
        AppDispatcher.dispatchAsync(KanbanApi.updateCard(card), {
            req: constants.UPDATE_CARD
            , success: constants.UPDATE_CARD_SUCCESS
            , failure: constants.UPDATE_CARD_FAILURE
        }, {card})
    }

    // Xu ly cho UI related states cua Card component
    , toggleCardDetails(cardId) {
        AppDispatcher.dispatch({
            type: constants.TOGGLE_CARD_DETAILS,
            payload: {cardId}
        })
    }
    , loadDefaultDraft(){
        AppDispatcher.dispatch({
            type: constants.LOAD_DEFAULT_DRAFT
        })
    }
    , createDraft(card) {
        AppDispatcher.dispatch({
            type: constants.CREATE_DRAFT,
            payload: {card}
        })
    }
    , updateDraft(field, value) {
        AppDispatcher.dispatch({
            type: constants.UPDATE_DRAFT,
            payload: {field, value}
        })
    }

    // Xu ly Drag&Drop cho Card
    , updateDraggingSource(draggingSource) {
        // console.log("updateDraggingSource: ", draggingSource)
        AppDispatcher.dispatch({
            type: constants.UPDATE_DRAGGING_SOURCE
            , payload: {draggingSource}
        })
    }
    // , updateCardStatus: throttle((cardId, listId) => {
    //     // Get the current card
    //     let card = CardStore.getCard(cardId)
    //     if (card.status !== listId)
    //         AppDispatcher.dispatch({
    //             type: constants.UPDATE_CARD_STATUS,
    //             payload: {cardId, listId}
    //         });
    // })
    // , updateCardPosition: throttle((cardId, afterId) => {
    //     if (cardId !== afterId)
    //         AppDispatcher.dispatch({
    //             type: constants.UPDATE_CARD_POSITION,
    //             payload: {cardId, afterId}
    //         });
    // })
    , updateCardStatus(cardId, status){
        // Get the current card
        let card = CardStore.getCard(cardId)
        if (card.status !== status)
            AppDispatcher.dispatch({
                type: constants.UPDATE_CARD_STATUS,
                payload: {cardId, status}
            });
    }
    , updateCardPosition(cardId, afterId){
        if (cardId !== afterId)
            AppDispatcher.dispatch({
                type: constants.UPDATE_CARD_POSITION,
                payload: {cardId, afterId}
            });
    }
    , persistCardDrag(cardId, status) {
        let cardIndex = CardStore.getCardIndex(cardId)
        AppDispatcher.dispatchAsync(KanbanApi.persistCardDrag(cardId, status, cardIndex), {
            req: constants.PERSIST_CARD_DRAG,
            success: constants.PERSIST_CARD_DRAG_SUCCESS,
            failure: constants.PERSIST_CARD_DRAG_FAILURE
        }, {cardId, status});
    }
}

export default CardAction
