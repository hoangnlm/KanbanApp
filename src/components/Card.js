/**
 * Created by Hoang on 11/18/16.
 */
import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import marked from "marked"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {DragSource, DropTarget} from 'react-dnd'
import CheckList from './CheckList'
import CardAction from "../actions/CardAction"
import DraggingAction from "../actions/DraggingAction"
import constants from "../constants"

let titlePropType = (props, propName, componentName) => {
    if (props[propName]) {
        let value = props[propName]
        if (typeof value !== 'string' || value.length > 80) {
            return new Error(
                `${propName} in ${componentName} is longer than 80 characters!`
            )
        }
    }
}

const cardDragSpec = {
    beginDrag(props, monitor) {
        // console.log("beginDrag:", props)
        DraggingAction.updateDraggingSource({
            type: constants.CARD
            , id: props.id
        })
        return {id: props.id}
    }
    , endDrag(props, monitor) {
        // console.log("endDrag:")
        DraggingAction.updateDraggingSource({
            type: undefined
            , id: undefined
        })
        if (monitor.didDrop()) {
            let status = monitor.getDropResult().id
            CardAction.persistCardDrag(props.id, status)
        }
    }
}

const cardDropSpec = {
    hover(props, monitor, component) {
        // console.log("cardDropSpec:", props.id)
        const draggedId = monitor.getItem().id
        CardAction.updateCardPosition(draggedId, props.id)
    }
}

let collectDrag = (connect, monitor) => ({
    connectDragSource: connect.dragSource()
    , isDragging: monitor.isDragging()
})

let collectDrop = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget()
})

class Card extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired
        , title: titlePropType
        , description: PropTypes.string
        , color: PropTypes.string
        , tasks: PropTypes.arrayOf(PropTypes.object)
        , connectDragSource: PropTypes.func
        , connectDropTarget: PropTypes.func
        , draggingSource: PropTypes.object
        , isDragging: PropTypes.bool
    }

    constructor() {
        super(...arguments)
        this.state = {
            isDragging: false
        }
    }

    // getInitialState() {
    //     return {isDragging: true}
    // }

    updateCardDragging(dragState) {
        this.setState({isDragging: dragState})
    }

    componentWillReceiveProps(nextProps) {
        // console.log("componentWillReceiveProps:", nextProps)
        if (nextProps.isDragging) {
            this.updateCardDragging(true)
        }
        if (nextProps.draggingSource.type !== constants.CARD) {
            this.updateCardDragging(false)
        }
    }

    componentDidMount() {
        // console.log("componentDidMount")
        if (this.props.draggingSource.type === constants.CARD && this.props.draggingSource.id === this.props.id) {
            // console.log("componentDidMount2")
            this.updateCardDragging(true)
        }
    }

    toggleDetails() {
        CardAction.toggleCardDetails(this.props.id)
    }

    render() {
        const {connectDragSource, connectDropTarget} = this.props
        // console.log("Card showDetails:", this.props)
        let cardDetails
        if (this.props.showDetails) {
            cardDetails = (
                <div className="card__details">
                    <div dangerouslySetInnerHTML={{__html: marked(this.props.description)}}/>
                    <CheckList
                        cardId={this.props.id}
                        tasks={this.props.tasks}
                    />
                </div>
            )
        }

        let sideColor = {
            position: 'absolute'
            , zIndex: -1
            , top: 0
            , bottom: 0
            , left: 0
            , width: 7
            , backgroundColor: this.props.color
        }

        let opacity = this.state.isDragging ? 0 : 1

        return connectDropTarget(connectDragSource(
            <div className="card" style={{opacity}}>
                <div style={sideColor}/>
                <div className="card__edit">
                    <Link
                        to={'/edit/' + this.props.id}
                        dangerouslySetInnerHTML={{__html: "&#9998;"}}
                    />
                </div>
                <div
                    className={this.props.showDetails ? "card__title--is-open" : "card__title"}
                    onClick={this.toggleDetails.bind(this)}
                    dangerouslySetInnerHTML={{__html: this.props.title}}
                />
                <ReactCSSTransitionGroup
                    transitionName="toggle"
                    transitionEnterTimeout={250}
                    transitionLeaveTimeout={250}
                >
                    {cardDetails}
                </ ReactCSSTransitionGroup>
            </div>
        ))
    }
}

const dragHighOrderCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card)
const dragDropHighOrderCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard)
export default dragDropHighOrderCard