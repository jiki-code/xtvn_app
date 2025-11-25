import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { reqGetAllUsersAttendance} from "@/feautures/api/attendance";

export function getDataAttendance(initialFilters) {
  const [data, setData] = useState([]);
  const [listDataFilter, setListDataFilter] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

  const fetchUsers = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const res = await reqGetAllUsersAttendance({ page, limit });
      const dataRes = res.data || res;
      const attendance = dataRes || dataRes.data || [];
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
    fetchUsers(pagination.current, pagination.pageSize);
  }, [pagination.current, pagination.pageSize]);

  return {
    data,
    listDataFilter,
    setListDataFilter,
    pagination,
    setPagination,
    filters,
    setFilters,
    fetchUsers,
    loading,
  };
}
