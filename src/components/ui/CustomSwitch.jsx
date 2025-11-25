import React from "react";
import { Switch } from "antd";
import PropTypes from "prop-types";
export function CustomSwitch({ value, onChange }) {

  return (
    <Switch
      checked={value === "active"}
      onChange={onChange}
      checkedChildren="Active"
      unCheckedChildren="Off"
      className="custom-switch"
    />
  );
}

CustomSwitch.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
