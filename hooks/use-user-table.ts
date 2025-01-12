import { UserType } from '@/types';
import { useEffect, useMemo, useState } from 'react';

const useUserTable = (usersData: UserType[]) => {
  const [users, setUsers] = useState<UserType[]>(usersData);
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()) || user.role.toLowerCase().includes(search.toLowerCase());
    });
  }, [users, search]);

  const paginatedUsers = useMemo(() => {
    return filteredUsers.slice((page - 1) * 10, page * 10);
  }, [filteredUsers, page]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredUsers.length / 10));
    setPage(1);
  }, [filteredUsers]);

  const handleDeleteSelected = () => {
    setUsers((prevUsers) => prevUsers.filter((user) => !selectedUsers.includes(user)));
    setSelectedUsers([]);
  };

  return {
    users,
    setUsers,
    selectedUsers,
    setSelectedUsers,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    setTotalPages,
    filteredUsers,
    paginatedUsers,
    handleDeleteSelected,
  };
};

export default useUserTable;
