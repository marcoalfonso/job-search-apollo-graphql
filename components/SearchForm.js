import Octicon, { X, Search } from '@githubprimer/octicons-react';
import React, { Component } from 'react';
import { css } from 'emotion';

import { Button, FlexGroup, Input } from '../primitives';
import { gutter } from '../utils';

const Clear = ({ onClick }) => (
	<div
		className={css({
			alignItems: 'center',
			bottom: 0,
			display: 'flex',
			justifyContent: 'center',
			position: 'absolute',
			right: 0,
			top: 0,
			width: 52,
		})}
	>
		<button
			onClick={onClick}
			className={css({
				alignItems: 'center',
				backgroundColor: '#bbb',
				border: 0,
				borderRadius: '50%',
				color: 'white',
				display: 'flex',
				height: 24,
				justifyContent: 'center',
				outline: 0,
				width: 24,

				':focus, :hover': {
					backgroundColor: '#999',
				},
				':active': {
					backgroundColor: '#888',
				},
			})}
			type="reset"
		>
			<Octicon icon={X} />
		</button>
	</div>
);

const SearchIcon = () => (
	<div
		className={css({
			alignItems: 'center',
			bottom: 0,
			color: '#999',
			display: 'flex',
			justifyContent: 'center',
			pointerEvents: 'none',
			position: 'absolute',
			top: 0,
			width: 52,
		})}
	>
		<Octicon size={24} icon={Search} />
	</div>
);

export class SearchForm extends Component {
	inputRef = React.createRef();

	onClear = () => {
		this.props.onClear();
		this.inputRef.current.focus();
	};

	render() {
		return (
			<form
				method="get"
				action="/"
				onSubmit={this.props.onSubmit}
				style={{ marginBottom: gutter * 3 }}
			>
				<FlexGroup growIndexes={[0]}>
					<div className={css({ position: 'relative' })}>
						<SearchIcon />
						<Input
							aria-describedby="search-submit"
							aria-label="Search"
							name="search"
							onChange={this.props.onChange}
							placeholder="I'm looking for..."
							ref={this.inputRef}
							size="large"
							style={{ paddingLeft: 52 }}
							type="search"
							value={this.props.value}
						/>
						{this.props.value ? <Clear onClick={this.onClear} /> : null}
					</div>
					<Button
						size="large"
						appearance="primary"
						type="submit"
						id="search-submit"
						onClick={this.props.onClick}
						style={{ paddingLeft: 32, paddingRight: 32 }}
					>
						Search
					</Button>
				</FlexGroup>
			</form>
		);
	}
}
