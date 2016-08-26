import React, { PropTypes } from 'react';
import moment, { ISO_8601 } from 'moment';

const calendar = {
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  nextWeek: 'dddd',
  lastDay: '[Yesterday]',
  lastWeek: 'dddd',
  sameElse: ISO_8601,
};

export default function Backup(props) {
  const { backup, selected, future, onSelect } = props;
  const created = moment(backup.created);
  const cardTitle = created.calendar(null, calendar);
  let content = created.format('dddd, MMMM D YYYY LT');

  if (backup.status !== 'successful') {
    if (backup.status === 'needsPostProcessing') {
      content = 'Backup running';
    } else if (backup.status === 'userAborted') {
      content = 'User aborted backup';
    } else {
      content = `Backup ${backup.status}`;
    }
  }

  let title = '';
  if (!future) {
    if (backup.type === 'snapshot') {
      title = 'Snapshot';
    } else {
      title = cardTitle;
    }
  } else {
    title = backup.created;
  }

  return (
    <div
      className={`backup ${selected === backup.id ? 'selected' : ''}
        ${future === true ? 'future' : ''}
        `}
      onClick={onSelect}
    >
      <header><div className="title">{title}</div></header>
      <div>
        <div className="content-col">{future === false ? content : backup.content}</div>
      </div>
    </div>
  );
}

Backup.propTypes = {
  backup: PropTypes.object.isRequired,
  selected: PropTypes.string,
  future: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};
