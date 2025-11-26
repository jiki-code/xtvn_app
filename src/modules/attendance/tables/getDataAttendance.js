import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { reqGetAllUsersBreakSessionReport} from "@/feautures/api/attendance";

export function getDataAttendance(initialFilters) {
  const [data, setData] = useState([]);
  const [listDataFilter, setListDataFilter] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

  const fetchUsersBreakReport = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const res = await reqGetAllUsersBreakSessionReport({ page, limit });
      const dataRes = res.data || res;
      const attendance = dataRes.break_reports || dataRes.data?.break_reports || [];
      const pagi = dataRes.pagination || dataRes.data?.pagination || {};

      setData(attendance);
      setListDataFilter(attendance);
      setPagination({
        current: pagi.currentPage || page,
        pageSize: pagi.limit || limit,
        total: pagi.total || attendance.length || 0,
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersBreakReport(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  return {
    data,
    listDataFilter,
    setListDataFilter,
    pagination,
    setPagination,
    filters,
    setFilters,
    fetchUsersBreakReport,
    loading,
  };
}
