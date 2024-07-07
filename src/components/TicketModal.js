import React, { Component } from 'react';

class TicketModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.ticket ? this.props.ticket.name : '',
            description: this.props.ticket ? this.props.ticket.description : '',
            status: this.props.ticket ? this.props.ticket.status : ''
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.ticket !== prevProps.ticket) {
            this.setState({
                name: this.props.ticket ? this.props.ticket.name : '',
                description: this.props.ticket ? this.props.ticket.description : '',
                status: this.props.ticket ? this.props.ticket.status : ''
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { name, description, status } = this.state;
        this.props.onSubmit({ name, description, status });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const { isOpen, onClose } = this.props;

        return (
            <div className={`modal ${isOpen ? 'is-open' : ''}`}>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        placeholder="Название"
                        required
                    />
                    <textarea
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                        placeholder="Описание"
                    />
                    <select name="status" value={this.state.status} onChange={this.handleChange}>
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="closed">Closed</option>
                    </select>
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={onClose}>Отмена</button>
                </form>
            </div>
        );
    }
}

export default TicketModal;
