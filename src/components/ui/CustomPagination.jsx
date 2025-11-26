"use client";
import { Pagination } from "antd";

const CustomPagination = ({ pagination, onChange }) => {
  const itemRender = (page, type, originalElement) => {
    if (type === "prev") {
      return <button disabled={pagination?.hasPrevious}>Prev</button>;
    }
    if (type === "next") {
      return <button disabled={pagination?.hasNext}>Next</button>;
    }
    return originalElement;
  };

  return (
    <Pagination
      className="custom-pagination"
      current={pagination.current}
      pageSize={pagination.pageSize}
      total={pagination.total}
      onChange={onChange}
      showSizeChanger={false}
      itemRender={itemRender}
      showTotal={(total, range) =>
        `Showing ${range[0]} - ${range[1]} of ${total}  entries`
      }
    />
  );
};

export { CustomPagination };
