'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import Table from '@/components/table';
import useUserTable from '@/hooks/use-user-table';
import { UserType } from '@/types';

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const Pagination = ({ page, totalPages, setPage }: PaginationProps) => {
  return (
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
  );
};

interface UserTableProps {
  usersData: UserType[];
}

const UserTable = ({ usersData }: UserTableProps) => {
  const { selectedUsers, setSelectedUsers, search, setSearch, page, setPage, totalPages, filteredUsers, paginatedUsers, handleDeleteSelected } = useUserTable(usersData);

  return (
    <div className='flex flex-col gap-2 mx-auto container mt-16'>
      {/* Search */}
      <div className='flex justify-center px-4'>
        <Input
          label='Search'
          placeholder='Search by name, email, or role'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Delete Selected Button */}
      <div className='flex justify-between px-4 h-10'>
        <div>{selectedUsers.length > 0 && <Button onClick={handleDeleteSelected}>Delete Selected</Button>}</div>

        <span>
          Showing {Math.min((page - 1) * 10 + 1, filteredUsers.length)} to {Math.min(page * 10, filteredUsers.length)} of {filteredUsers.length} entries
        </span>
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
      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
};

export default UserTable;
