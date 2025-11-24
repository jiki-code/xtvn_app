import { Button, Radio, Space, Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import styles from "../style/userList.module.css";

export const Toolbar = ({
  mode,
  setMode,
  pageSize,
  setPageSize,
  onFilter,
  onClear,
  onAdd,
  pageSizeList,
}) => {
  const handleModeChange = (e) => {
    const value = e.target.value;
    setMode(value);
    if (value === "clear") onClear();
    if (value === "filter") onFilter();
  };

  return (
    <div className="flex justify-between px-2">
      <Button className={styles.createBtn} onClick={onAdd}>
        Create New Staff
      </Button>
      <Space>
        <Radio.Group onChange={handleModeChange} value={mode} style={{ display: "flex" }}>
          <Radio.Button value="filter" className={styles.baseButtonFilter}>
            <FilterOutlined className="mr-1" /> Filter
          </Radio.Button>
          <Radio.Button value="clear" className={styles.baseButtonClear}>
            Clear
          </Radio.Button>
        </Radio.Group>
        <Select
          className={styles.customSelect}
          options={pageSizeList}
          value={pageSize}
          onChange={setPageSize}
        />
      </Space>
    </div>
  );
};
