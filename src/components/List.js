/**
 * Created by Hoang on 11/18/16.
 */
import React, {Component, PropTypes} from 'react'
import {DropTarget} from 'react-dnd'
import constants from '../constants'
import Card from './Card'
import CardAction from "../actions/CardAction"

const listDropSpec = {
    hover(props, monitor){
        if (monitor.isOver({shallow: true})) {
            // console.log("listDropSpec:", props.id)
            const draggedId = monitor.getItem().id;
            CardAction.updateCardStatus(draggedId, props.id)
        }
    }
    , drop(props, monitor, component){
        return {
            id: props.id
        }
    }
}

let collectDrop = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
})

class List extends Component {
    static propTypes = {
        id: PropTypes.string
        , title: PropTypes.string.isRequired
        , cards: PropTypes.arrayOf(PropTypes.object).isRequired
        , cardCallbacks: PropTypes.object
        , connectDropTarget: PropTypes.func
        , draggingSource: PropTypes.object
    }

    render() {
        const {connectDropTarget} = this.props
        // console.log("List:", this.props)
        let cards = this.props.cards.map((card, i) => {
            return <Card
                id={card.id}
                key={card.id}
                draggingSource={this.props.draggingSource}
                {...card}
            />
        });
        return connectDropTarget(
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        );
    }
}

export default DropTarget(constants.CARD, listDropSpec, collectDrop)(List)