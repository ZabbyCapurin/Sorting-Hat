import React from 'react';
import PropTypes from 'prop-types';

export default class OrgGroup extends React.PureComponent {
  render() {
    const displayMembers = this.props.members.map(member => <li key={member.id}>{member.FirstName} {member.LastName}<span>{member.Organization}</span></li>);

    return (
      <div className="group" key={this.props.id}>
        <strong>Group #{this.props.id + 1}</strong>
        <ul>
          {displayMembers}
        </ul>
      </div>
    );
  }
}

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
