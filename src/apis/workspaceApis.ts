import axiosClient from './axiosClient';
import { Workspace } from 'src/@types';
export const workspaceApis = {
  getWorkspaces: () => axiosClient.get<Workspace[]>('/workspace'),
  getWorkspace: (id) => axiosClient.get<Workspace>(`/workspace/${id}`),
  updateWorkspace: (id, newWorkspace) => axiosClient.put(`/workspace/${id}`, newWorkspace),
  createWorkspace: (newWorkspace) =>
    axiosClient.post('/workspace', newWorkspace, {
      timeout: 600000,
    }),
  deleteWorkspace: (id) => axiosClient.delete(`/workspace/${id}`),
};
