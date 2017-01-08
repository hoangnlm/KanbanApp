/**
 * Created by Hoang on 11/25/16.
 */
import React, {Component} from "react"
import {browserHistory} from "react-router"
import {Container} from "flux/utils"
import CardForm from "./CardForm"
import CardAction from "../actions/CardAction"
import DraftCardStore from "../stores/DraftCardStore"

class NewCard extends Component {
    handleChange(field, value) {
        CardAction.updateDraft(field, value)
    }

    handleSubmit(e) {
        e.preventDefault();
        CardAction.addCard(this.state.draftCard);
        browserHistory.push("/")
    }

    handleClose(e) {
        browserHistory.push("/")
    }

    componentWillMount() {
        CardAction.loadDefaultDraft()
    }

    componentDidMount() {
        setTimeout(() => CardAction.createDraft(), 0)
    }

    render() {
        return (
            <CardForm draftCard={this.state.draftCard}
                      buttonLabel="Create Card"
                      handleChange={this.handleChange.bind(this)}
                      handleSubmit={this.handleSubmit.bind(this)}
                      handleClose={this.handleClose.bind(this)}/>
        );
    }
}

NewCard.getStores = () => [DraftCardStore]
NewCard.calculateState = prevState => ({
    draftCard: DraftCardStore.getDraftCard()
})

export default Container.create(NewCard)