/**
 * Created by Hoang on 11/18/16.
 */
import React, {Component} from "react"
import List from "./List"
import {Link} from "react-router"
import {Container} from "flux/utils"
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import CardAction from "../actions/CardAction"
import CardStore from "../stores/CardStore"
import DraggingStore from "../stores/DraggingStore"

class Kanban extends Component {
    componentDidMount() {
        CardAction.fetchCards()
    }

    // draggingSource={this.props.draggingSource}
    render() {
        return (
            <div className="app">
                <Link to="/new" className="float-button">+</Link>
                <List
                    id="todo"
                    title="To Do"
                    cards={this.state.cards.filter(card => card.status === "todo")}
                    draggingSource={this.state.draggingSource}
                />
                <List
                    id="in-progress"
                    title="In Progress"
                    cards={this.state.cards.filter(card => card.status === "in-progress")}
                    draggingSource={this.state.draggingSource}
                />
                <List
                    id="done"
                    title="Done"
                    cards={this.state.cards.filter(card => card.status === "done")}
                    draggingSource={this.state.draggingSource}
                />
                {this.props.children}
            </div>
        )
    }
}

Kanban.getStores = () => [CardStore, DraggingStore]
Kanban.calculateState = prevState => ({
    cards: CardStore.getCards()
    , draggingSource: DraggingStore.getDraggingSource()
})

export default DragDropContext(HTML5Backend)(Container.create(Kanban))
