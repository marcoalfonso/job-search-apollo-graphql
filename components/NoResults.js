import { css } from 'emotion';
import React from 'react';

import { Button, H1, Hr } from '../primitives';
import { gutter } from '../utils';

export const NoResults = ({ onClearSearch }) => (
	<div className={css({ padding: gutter * 2 })}>
		<H1>No results</H1>
		<p>Sorry, we couldn't find what you're looking for.</p>
		<Hr />
		<p>You can try clearing the search filter.</p>
		<Button onClick={onClearSearch}>Clear search</Button>
	</div>
);
