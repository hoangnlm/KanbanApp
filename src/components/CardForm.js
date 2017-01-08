/**
 * Created by Hoang on 11/25/16.
 */
import React, {Component, PropTypes} from 'react'

class CardForm extends Component {
    static propTypes = {
        draftCard: PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
            status: PropTypes.string,
            color: PropTypes.string
        }),
        buttonLabel: PropTypes.string.isRequired,
        handleChange: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        handleClose: PropTypes.func.isRequired,
    }

    handleChange(field, e) {
        this.props.handleChange(field, e.target.value);
    }

    handleClose(e) {
        e.preventDefault();
        this.props.handleClose();
    }

    handleEscape(e) {
        // console.log("Xu ly khi bam escape!")
    }

    render() {
        return (
            <div onKeyPress={this.handleEscape.bind(this)}>
                <div className="card big">
                    <form onSubmit={this.props.handleSubmit.bind(null)}>
                        <p><input type='text'
                                  value={this.props.draftCard.title}
                                  onChange={this.handleChange.bind(this, 'title')}
                                  placeholder="Title"
                                  required={true}
                                  autoFocus={true}/></p>
                        <p><textarea value={this.props.draftCard.description}
                                     onChange={this.handleChange.bind(this, 'description')}
                                     placeholder="Description"
                                     required={true}/></p>
                        <p><label htmlFor="status">Status</label>
                            <select id="status"
                                    value={this.props.draftCard.status}
                                    onChange={this.handleChange.bind(this, 'status')}>
                                <option value="todo">To Do</option>
                                <option value="in-progress">In Progress</option>
                                <option value="done">Done</option>
                            </select></p>
                        <p><label htmlFor="color">Color</label>
                            <input id="color"
                                   value={this.props.draftCard.color}
                                   onChange={this.handleChange.bind(this, 'color')}
                                   type="color"/></p>
                        <div className='actions'>
                            <button type="submit">{this.props.buttonLabel}</button>
                        </div>
                    </form>
                </div>
                <div className="overlay" onClick={this.handleClose.bind(this)}>
                </div>
            </div>
        );
    }
}

export default CardForm