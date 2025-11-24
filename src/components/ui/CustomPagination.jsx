"use client";
import { Pagination } from "antd";

const CustomPagination = ({ pagination, onChange }) => {
  const itemRender = (page, type, originalElement) => {
    if (type === "prev") {
      return <button> Prev</button>;
    }
    if (type === "next") {
      return <button >Next</button>;
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
        `Total ${range[0]} - ${range[1]} / ${total} of `
      }
    />
  );
};

export  {CustomPagination};
