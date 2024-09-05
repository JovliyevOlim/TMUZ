import { APIClient } from './api_helpers.ts';

import * as url from './url_helper';

const api = new APIClient();


// add New User
export const addNewUser = (user: any) => api.create(url.ADD_NEW_USER, user);
// add New Work
export const addNewJob = (job: any) => api.create(url.ADD_NEW_JOB, job);
export const updateJob = (job: any) => api.put(url.UPDATE_JOB + '/' + job.id, job);
export const deleteJob = (jobId: string) => api.delete(url.DELETE_JOB + '/' + jobId);
export const getJobs = () => api.get(url.GET_ALL_JOB);