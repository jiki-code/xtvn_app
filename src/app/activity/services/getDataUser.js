'use client'
import { reqGetAllUsers } from "@/feautures/api/users";
import { useEffect, useRef, useState } from "react";

export function getDataUser() {
    const [users, setUsers] = useState([])
    const [pagination, setPagination] = useState([])


    const fetched = useRef(false)
    const getListUser = async () => {
        const data = await reqGetAllUsers()
        setUsers(data?.data?.users)
        setPagination(data.pagination)
        console.log("🚀 ~ getListUser ~ data:", data)

    }
    useEffect(() => {
        if (fetched.current) return;
        fetched.current = true

        getListUser()
    }, [])

    return { users, pagination }
}