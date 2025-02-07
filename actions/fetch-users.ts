import { UserType } from '@/types';

export const fetchUsers = async () => {
  const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
  const data = await response.json();
  return data as UserType[];
};
