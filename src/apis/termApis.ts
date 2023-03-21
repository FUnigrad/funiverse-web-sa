import { Term } from 'src/@types';
import axiosClient from './axiosClient';
export const termApis = {
  getTerms: () => axiosClient.get<Term[]>(`/workspace/term`),
  getTerm: (id: string) => axiosClient.get<Term>(`/workspace/term/${id}`),
  startNewSemester: () => axiosClient.post(`workspace/term/start-new`),
  createTerm: (newTerm) => axiosClient.post('/workspace/term', newTerm),
  updateTerm: (newTerm) => axiosClient.put(`/workspace/term/${newTerm.id}`, newTerm),
  deleteTerm: (id: number) => axiosClient.delete(`/workspace/term/${id}`),
};
