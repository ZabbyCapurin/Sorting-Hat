import React from 'react';
import PropTypes from 'prop-types';

export default class OrgGroup extends React.PureComponent {
  render() {
    const displayMembers = this.props.members.map(member => <li key={member.id}>{member.FirstName} {member.LastName} ({member.Organization})</li>);

    return (
      <div key={this.props.id}>
        <h1>Group #{this.props.id}</h1>
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
