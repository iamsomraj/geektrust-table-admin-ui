import { fetchUsers } from '@/actions/fetch-users';
import UserTable from '@/app/_components/user-table';

export default async function Page() {
  const users = await fetchUsers();

  return (
    <div>
      <UserTable users={users} />
    </div>
  );
}
