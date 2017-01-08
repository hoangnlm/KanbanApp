/**
 * Created by Hoang on 11/25/16.
 */
import React, {Component} from "react"
import {browserHistory} from "react-router"
import {Container} from "flux/utils"
import CardForm from "./CardForm"
import CardStore from "../stores/CardStore"
import CardAction from "../actions/CardAction"
import DraftCardStore from "../stores/DraftCardStore"

class EditCard extends Component {
    handleChange(field, value) {
        CardAction.updateDraft(field, value)
    }

    handleSubmit(e) {
        e.preventDefault()
        CardAction.updateCard(this.state.draftCard)
        browserHistory.push("/")
    }

    handleClose(e) {
        browserHistory.push("/")
    }

    componentWillMount() {
        CardAction.loadDefaultDraft()
    }

    componentDidMount() {
        setTimeout(() => CardAction.createDraft(CardStore.getCard(Number(this.props.params.card_id))), 0)
    }

    render() {
        return (
            <CardForm draftCard={this.state.draftCard}
                      buttonLabel="Edit Card"
                      handleChange={this.handleChange.bind(this)}
                      handleSubmit={this.handleSubmit.bind(this)}
                      handleClose={this.handleClose.bind(this)}/>
        )
    }
}

EditCard.getStores = () => [DraftCardStore]
EditCard.calculateState = prevState => ({
    draftCard: DraftCardStore.getDraftCard()
})

export default Container.create(EditCard)