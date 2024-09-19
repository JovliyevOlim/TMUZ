import { APIClient } from './api_helpers.ts';

import * as url from './url_helper';

const api = new APIClient();

//auth user
export const postLogin = (data: any) => api.create(url.POST_LOGIN, data);

// get all user
export const getAllUser = (user: any) => api.get(url.ADD_NEW_USER, user);
// get user by id
export const getUserById = (user: any) => api.get(url.ADD_NEW_USER, user);
// add New User
export const addNewUser = (user: any) => api.create(url.ADD_NEW_USER, user);
// update  User
export const updateUser = (user: any) => api.put(url.UPDATE_USER, user);
// delete User
export const deleteUser = (user: any) => api.delete(url.DELETE_USER, user);

// add New Work
export const addNewJob = (job: any) => api.create(url.ADD_NEW_JOB, job);
export const updateJob = (job: any) => api.put(url.UPDATE_JOB + '/' + job.id, job);
export const deleteJob = (jobId: string) => api.delete(url.DELETE_JOB + '/' + jobId);
export const getJobs = () => api.get(url.GET_ALL_JOB);

// get all station
export const getAllStation = () => api.get(url.GET_ALL_STATION);
// get user by id
export const getStationById = (station: any) => api.get(url.GET_STATION_BY_ID, station);
// add New User
export const addNewStation = (station: any) => api.create(url.ADD_NEW_STATION, station);
// update  User
export const updateStation = (station: any) => api.put(url.UPDATE_STATION + '/' + station.id, station);


// get action by user done
export const getActionByUserDone = (action: any) => api.get(url.GET_ACTION_BY_USER, action);
// get action by user done false
export const getActionByUserDoneFalse = (action: any) => api.get(url.GET_ACTION_BY_USER_FALSE, action);
// add New Action
export const addNewAction = (action: any) => api.create(url.ADD_NEW_ACTION, action);
// update  Action
export const updateAction = (action: any) => api.put(url.UPDATE_ACTION, action);
// check device for  Action
export const checkDeviceForAction = (action: any) => api.create(url.CHECK_DEVICE_FOR_ACTION, action);


// get device by qr code
export const getDeviceInfoForQr = (device: any) => api.get(url.GET_DEVICE_INFO_FOR_QR + '/' + device);
// get device by id
export const getDeviceById = (device: any) => api.get(url.GET_DEVICE_BY_ID, device);
// get all device
export const getAllDevice = () => api.get(url.GET_ALL_DEVICE);
// get all device info action
export const getAllDeviceInfoActions = (device: any) => api.get(url.GET_ALL_DEVICE_INFO_ACTIONS, device);
// add New device
export const addNewDevice = (device: any) => api.create(url.ADD_NEW_DEVICE, device);
// update  device
export const updateDevice = (device: any) => api.put(url.UPDATE_DEVICE + '/' + device.id, device);
