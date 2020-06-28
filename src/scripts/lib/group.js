import React from 'react';
import PropTypes from 'prop-types';

const OrgGroup = (props) => {
  const { members, id } = props;
  const displayMembers = members.map((member) => (
    <li key={member.id}>
      {member.FirstName}
      {!!member.LastName && member.LastName !== '' ? ` ${member.LastName}` : null}
      {
        !!member.Organization && member.Organization !== ''
          ? <span>{member.Organization}</span>
          : null
      }
    </li>
  ));

  return (
    <div className="group" key={id}>
      <strong>
        Group #
        {id + 1}
      </strong>
      <ul>
        {displayMembers}
      </ul>
    </div>
  );
};

OrgGroup.defaultProps = {
  members: [],
};

OrgGroup.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    FirstName: PropTypes.string.isRequired,
    LastName: PropTypes.string.isRequired,
    Organization: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })),
  id: PropTypes.number.isRequired,
};

export default OrgGroup;
