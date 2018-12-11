import React, { forwardRef } from 'react';
import { css } from 'emotion';

import { colors, gutter } from '../utils';

const shadow = str => `${str}, inset 0 2px 1px rgba(0, 0, 0, 0.075)`;

function makeSize(size) {
	const sizes = {
		small: {
			fontSize: '0.85rem',
			padding: `${gutter / 2}px ${gutter}px`,
		},
		medium: {
			fontSize: '1rem',
			padding: `${gutter}px ${gutter * 1.5}px`,
		},
		large: {
			fontSize: '1.25rem',
			padding: `${gutter * 1.5}px ${gutter * 2}px`,
		},
	};
	return sizes[size];
}

export const Input = forwardRef(({ isMultiline, size, ...props }, ref) => {
	const styles = {
		appearance: 'none',
		background: 'none',
		backgroundColor: 'white',
		border: 0,
		borderRadius: 3,
		boxShadow: shadow(`inset 0 0 0 1px ${colors.blueGrey['100']}`),
		boxSizing: 'border-box',
		color: 'inherit',
		lineHeight: '1.4em',
		margin: 0,
		padding: '8px 12px',
		transition: 'box-shadow 100ms linear',
		verticalAlign: 'middle',
		whiteSpace: 'nowrap',
		width: '100%',
		...makeSize(size),

		':hover': {
			boxShadow: shadow(`inset 0 0 0 1px ${colors.blueGrey['200']}`),
			outline: 0,
		},
		':focus': {
			boxShadow: shadow(
				`inset 0 0 0 1px ${colors.blue.a400}, 0 0 0 3px ${colors.blue['100']}`
			),
			outline: 0,
		},
		'&[disabled]': {
			boxShadow: 'none',
			backgroundColor: colors.blueGrey['50'],
		},
	};
	return isMultiline ? (
		<textarea
			ref={ref}
			className={css({ ...styles, lineHeight: 'inherit', height: 'auto' })}
			{...props}
		/>
	) : (
		<input ref={ref} className={css(styles)} {...props} />
	);
});

Input.defaultProps = {
	size: 'medium',
};
