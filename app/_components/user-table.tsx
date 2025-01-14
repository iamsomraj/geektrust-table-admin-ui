'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import Table from '@/components/table';
import useUserTable from '@/hooks/use-user-table';
import { UserType } from '@/types';

interface UserSearchProps {
  setSearch: (search: string) => void;
}

function UserSearch({ setSearch }: UserSearchProps) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    setSearch(search);
  };

  return (
    <form
      className='flex justify-center gap-2 px-4'
      onSubmit={handleSearch}
    >
      <Input
        prepend={
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='size-6 search-icon'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
            />
          </svg>
        }
        label='Search'
        placeholder='Search by name, email, or role'
        name='search'
      />
      <div className='flex items-end'>
        <Button type='submit'>Search</Button>
      </div>
    </form>
  );
}

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
  const { hasUsers, selectedUsers, setSelectedUsers, setSearch, page, setPage, totalPages, filteredUsers, paginatedUsers, handleDeleteSelected, handleSave, handleDelete } = useUserTable(usersData);

  return hasUsers ? (
    <div className='flex flex-col gap-2 mx-auto container my-16'>
      {/* Search */}
      <UserSearch setSearch={setSearch} />

      {/* Delete Selected Button */}
      <div className='flex justify-between px-4 h-10'>
        <div>{selectedUsers.length > 0 && <Button onClick={handleDeleteSelected}>Delete Selected</Button>}</div>

        <span>
          Showing {Math.min((page - 1) * 10 + 1, filteredUsers.length)} to {Math.min(page * 10, filteredUsers.length)} of {filteredUsers.length} entries
        </span>
      </div>

      {/* Table */}
      <div className='px-4'>
        <Table<UserType>
          data={paginatedUsers}
          columns={[
            { key: 'name', label: 'Name', render: (user) => user.name },
            { key: 'email', label: 'Email', render: (user) => user.email },
            { key: 'role', label: 'Role', render: (user) => user.role },
          ]}
          areEqual={(a, b) => Number(a.id) === Number(b.id)}
          selected={selectedUsers}
          addCheckbox
          addActions
          onSelect={setSelectedUsers}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  ) : (
    <div className='flex justify-center items-center gap-6 flex-col h-96'>
      <p className='text-xl'>All users have been deleted.</p>
      <Button onClick={() => window.location.reload()}>Reload</Button>
    </div>
  );
};

export default UserTable;
