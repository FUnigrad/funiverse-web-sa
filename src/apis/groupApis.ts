import { groupData } from 'src/__mock__';
import axiosClient from './axiosClient';
import { fakePromise } from 'src/utils';
import { Group, GroupUser } from 'src/@types';
const searchData = [
  {
    value: 1,
    label: 'ABC',
  },
  {
    value: 2,
    label: 'DEF',
  },
  {
    value: 3,
    label: 'ACE',
  },
];
const fakeSearchPromise = (inputValue: string): Promise<any[]> =>
  new Promise((res, rej) => {
    setTimeout(() => {
      return res(searchData.filter((s) => s.label.includes(inputValue)));
    }, 300);
  });

export const groupApis = {
  // fetchGroups: () => axiosClient.get('/group'),
  // getGroups: () => fakePromise(groupData),
  getGroups: () => axiosClient.get<Group[]>('/group'),
  updateGroup: (newGroup) => axiosClient.put(`/group`, newGroup),
  createGroup: (newGroup) => axiosClient.post('/group', newGroup),
  deleteGroup: (id) => axiosClient.delete(`/group/${id}`),
  getGroup: (id) => axiosClient.get(`/group/${id}`),
  getGroupUsers: (id) => axiosClient.get<GroupUser[]>(`/group/${id}/users`),
  addGroupUsers: (groupId, userIds: number[]) =>
    axiosClient.post(`/group/${groupId}/members`, userIds),
  removeGroupUser: (groupId, userId) => axiosClient.delete(`/group/${groupId}/user/${userId}`),
  getFakedSearch: fakeSearchPromise,
};
