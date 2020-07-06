import React from "react";
import PropTypes from "prop-types";

function TechItem({ tech, handleRemove }) {
  return (
    <li>
      {tech}
      <button type="button" onClick={handleRemove}>
        Remover
      </button>
    </li>
  );
}

TechItem.defaultProps = {
  tech: "",
};

TechItem.propTypes = {
  tech: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default TechItem;
