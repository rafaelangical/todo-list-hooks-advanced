import React from 'react';
import Icon from '@material-ui/core/Icon';
import TodoButton from './TodoButton';
import { connect } from 'react-redux';
import { addList, addCard } from '../actions';
import styled from 'styled-components';
import TodoForm from './TodoForm';
import TodoOpenForm from './TodoOpenForm';

class TodoCreate extends React.PureComponent {
	state = {
		formOpen: false,
		text: ''
	};

	openForm = () => {
		this.setState({
			formOpen: true
		});
	};

	closeForm = e => {
		this.setState({
			formOpen: false
		});
	};

	handleInputChange = e => {
		this.setState({
			text: e.target.value
		});
	};

	handleAddList = () => {
		const { dispatch } = this.props;
		const { text } = this.state;

		if (text) {
			this.setState({
				text: ''
			});
			dispatch(addList(text));
		}

		return;
	};

	handleAddCard = () => {
		const { dispatch, listID } = this.props;
		const { text } = this.state;

		if (text) {
			this.setState({
				text: ''
			});
			dispatch(addCard(listID, text));
		}
	};

	renderOpenForm = () => {
		const { list } = this.props;

		const buttonText = list ? 'Adicionar outra lista' : 'Adicionar outro item';
		const buttonTextOpacity = list ? 1 : 0.5;
		const buttonTextColor = list ? 'white' : 'inherit';
		const buttonTextBackground = list ? 'rgba(0,0,0,.15)' : 'inherit';

		const OpenFormButton = styled.div`
			display: flex;
			align-items: center;
			cursor: pointer;
			border-radius: 3px;
			height: 36px;
			margin-left: 8px;
			width: 300px;
			padding-left: 10px;
			padding-right: 10px;
			opacity: ${buttonTextOpacity};
			color: ${buttonTextColor};
			background-color: ${buttonTextBackground};
		`;

		return (
			<OpenFormButton onClick={this.openForm}>
				<Icon>add</Icon>
				<p style={{ flexShrink: 0 }}>{buttonText}</p>
			</OpenFormButton>
		);
	};

	render() {
		const { text } = this.state;
		const { list } = this.props;
		return this.state.formOpen ? (
			<TodoForm text={text} onChange={this.handleInputChange} closeForm={this.closeForm}>
				<TodoButton onClick={list ? this.handleAddList : this.handleAddCard}>
					{list ? 'Aicionar lista' : 'Add item'}
				</TodoButton>
			</TodoForm>
		) : (
			<TodoOpenForm list={list} onClick={this.openForm}>
				{list ? 'Adicionar outra lista' : 'Adicionar outro item'}
			</TodoOpenForm>
		);
	}
}

export default connect()(TodoCreate);
