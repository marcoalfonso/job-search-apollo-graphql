import React, { Fragment } from 'react';
import { css } from 'emotion';

import { colors, formatDate, gutter } from '../utils';
import { FlexGroup, H3 } from '../primitives';
import FavoriteButton from './FavoriteButton';
import { Link } from './Router';

export const JobItem = ({ job, index }) => (
	<Fragment>
		{index ? (
			<div
				className={css({
					backgroundColor: colors.blueGrey['50'],
					height: 2,
				})}
			/>
		) : null}
		<div className={css({ fontSize: 14, padding: 16 })}>
			<FlexGroup align="center" growIndexes={[0]}>
				<div>
					<H3 as="h2">
						<Link
							to={`/job?jobId=${job.id}`}
							as={`/job/${job.id}`}
							className={css({
								':hover, :focus': {
									color: colors.blue.a700,
									outline: 0,
									textDecoration: 'underline',
								},
							})}
						>
							{job.title}
						</Link>
					</H3>

					<div>Added: {formatDate(job.dateAdded)}</div>
					<div>Source: {job.source}</div>
					<p className={css({ color: colors.grey['700'], marginTop: gutter })}>
						{job.description}
					</p>
				</div>
				<FlexGroup isVertical>
					<img src={job.logo} alt={job.source} style={{ maxWidth: 80 }} />
					<FavoriteButton id={job.id} />
				</FlexGroup>
			</FlexGroup>
		</div>
	</Fragment>
);
