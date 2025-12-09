import React from 'react';
import PropTypes from 'prop-types';

const Admonition = ({ type, title, children }) => {
  // Define styles for different admonition types
  const styles = {
    note: {
      borderLeft: '4px solid #007cba', // Blue
      backgroundColor: '#f0f8ff',
      padding: '12px 16px',
      margin: '16px 0',
      borderRadius: '0 4px 4px 0',
    },
    tip: {
      borderLeft: '4px solid #28a745', // Green
      backgroundColor: '#f0fff4',
      padding: '12px 16px',
      margin: '16px 0',
      borderRadius: '0 4px 4px 0',
    },
    danger: {
      borderLeft: '4px solid #dc3545', // Red
      backgroundColor: '#fff5f5',
      padding: '12px 16px',
      margin: '16px 0',
      borderRadius: '0 4px 4px 0',
    },
    info: {
      borderLeft: '4px solid #17a2b8', // Teal
      backgroundColor: '#f0fcff',
      padding: '12px 16px',
      margin: '16px 0',
      borderRadius: '0 4px 4px 0',
    },
  };

  // Get the style for the specified type
  const currentStyle = styles[type] || styles.note;

  return (
    <div style={currentStyle} role="note">
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  );
};

Admonition.propTypes = {
  type: PropTypes.oneOf(['note', 'tip', 'danger', 'info']),
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Admonition.defaultProps = {
  type: 'note',
};

export default Admonition;