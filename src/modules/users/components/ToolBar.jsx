import { Button, Radio, Space, Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import styles from "../style/userList.module.css";

export const Toolbar = ({
  setMode,
  pageSize,
  setPageSize,
  onFilter,
  onClear,
  onAdd,
  pageSizeList,
}) => {
const handleClick = (value = "filter") => {
  setMode(value);
  if (value === "clear") onClear();
  if (value === "filter") onFilter();
};
  return (
  <div className="flex justify-between">
    <Button className={styles.createBtn} onClick={onAdd}>
      Create New Staff
    </Button>
    <Space>
      <Radio.Group style={{ display: "flex" }}>
        <Radio.Button
          value="filter"
          onClick={() => handleClick("filter")}   
          className={styles.baseButtonFilter}
        >
          <FilterOutlined className="mr-1" /> Filter
        </Radio.Button>

        <Radio.Button
          value="clear"
          onClick={() => handleClick("clear")}   
          className={styles.baseButtonClear}
        >
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
