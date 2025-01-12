'use client';

import Table from '@/components/table';
import Button from '@/components/button';
import Input from '@/components/input';
import { UserType } from '@/types';
import { useEffect, useMemo, useState } from 'react';

interface UserTableProps {
  users: UserType[];
}

const UserTable = ({ users }: UserTableProps) => {
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

  return (
    <div className='flex flex-col gap-6'>
      {/* Search */}
      <div className='flex justify-center px-4'>
        <Input
          label='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Delete Selected Button */}
      <div className='flex justify-center h-10'>
        {selectedUsers.length > 0 && (
          <Button
            variant='secondary'
            onClick={() => {
              console.log('Delete Selected', selectedUsers);
            }}
          >
            Delete Selected
          </Button>
        )}
      </div>

      {/* Table */}
      <Table<UserType>
        data={paginatedUsers}
        columns={[
          { key: 'name', label: 'Name', render: (user) => user.name },
          { key: 'email', label: 'Email', render: (user) => user.email },
          { key: 'role', label: 'Role', render: (user) => user.role },
        ]}
        selected={selectedUsers}
        addCheckbox
        onSelect={setSelectedUsers}
        areEqual={(a, b) => Number(a.id) === Number(b.id)}
      />

      {/* Pagination */}
      <div className='flex gap-2 flex-wrap justify-center'>
        <Button
          className='first-page'
          disabled={page === 1}
          onClick={() => setPage(1)}
        >
          First
        </Button>
        <Button
          className='previous-page'
          disabled={page === 1}
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
        >
          Previous
        </Button>
        {[...Array(totalPages)].map((_, index) => (
          <Button
            variant={index + 1 === page ? 'secondary' : 'primary'}
            key={index}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          className='next-page'
          disabled={page === totalPages}
          onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
        >
          Next
        </Button>
        <Button
          className='last-page'
          disabled={page === totalPages}
          onClick={() => setPage(totalPages)}
        >
          Last
        </Button>
      </div>
    </div>
  );
};

export default UserTable;
