import { APIClient } from './api_helpers.ts';

import * as url from './url_helper';

const api = new APIClient();

//auth user
export const postLogin = (data: any) => api.create(url.POST_LOGIN, data);

// get all user
export const getAllUser = () => api.get(url.GET_ALL_USER);
// get user by id
export const getUserById = (user: any) => api.get(url.GET_USER_BY_ID + '/' + user);
// add New User
export const addNewUser = (user: any) => api.create(url.ADD_NEW_USER, user);
// update  User
export const updateUser = (user: any) => api.put(url.UPDATE_USER, user);
// delete User
export const deleteUser = (user: any) => api.delete(url.DELETE_USER, user);

// add New Work
export const addNewJob = (job: any) => api.create(url.ADD_NEW_JOB, job);
export const updateJob = (job: any) => api.put(url.UPDATE_JOB + '/' + job.id, job);
export const pauseJob = (job: any) => api.put(url.PAUSE_JOB + '/' + job.id, job);
export const doneJob = (job: any) => api.put(url.DONE_JOB + '/' + job.id, job);
export const confirmJob = (job: any) => api.put(url.CONFIRM_JOB + '/' + job.id, job);
export const deleteJob = (jobId: string) => api.delete(url.DELETE_JOB + '/' + jobId);
export const getJobs = (job: any) => api.get(url.GET_ALL_JOB_BY_STATION + '/' + job.stationId, job.params);

// get all station
export const getAllStation = () => api.get(url.GET_ALL_STATION);
// get station by id
export const getStationById = (station: any) => api.get(url.GET_STATION_BY_ID, station);
// get station by plot id
export const getStationByPlotId = (station: any) => api.get(url.GET_STATION_BY_PLOT_ID + '/' + station);
// add New station
export const addNewStation = (station: any) => api.create(url.ADD_NEW_STATION, station);
// update  station
export const updateStation = (station: any) => api.put(url.UPDATE_STATION + '/' + station.id, station);
// delete  station
export const deleteStation = (station: any) => api.delete(url.DELETE_STATION + '/' + station);


// get action filter
export const getActionFilter = (params: any) => api.get(url.GET_ACTION_FILTER + '/' + params);
// get action by user done
export const getActionByUserDone = (action: any) => api.get(url.GET_ACTION_BY_USER + '/' + action);
// get action by user done false
export const getActionByUserDoneFalse = (action: any) => api.get(url.GET_ACTION_BY_USER_FALSE + '/' + action);
// add New Action
export const addNewAction = (action: any) => api.create(url.ADD_NEW_ACTION, action);
// update  Action
export const updateAction = (action: any) => api.put(url.UPDATE_ACTION + '/' + action.id, action);
// delete  Action
export const deleteAction = (action: any) => api.delete(url.DELETE_ACTION + '/' + action);
// check device for  Action
export const checkDeviceForAction = (action: any) => api.create(url.CHECK_DEVICE_FOR_ACTION, action);


// get device by qr code
export const getDeviceInfoForQr = (device: any) => api.get(url.GET_DEVICE_INFO_FOR_QR + '/' + device);
// get device by id
export const getDeviceById = (device: any) => api.get(url.GET_DEVICE_BY_ID, device);
// get device by category id
export const getDeviceCategoryId = (device: any) => api.get(url.GET_DEVICE_BY_CATEGORY_ID + '/' + device);

// get device by plot id
export const getDevicePlotId = (device: any) => api.get(url.GET_DEVICE_BY_CATEGORY_ID_PLOT_ID + '/' + device.categoryId + '/' + device.plotId, device.params);

// get device by station id
export const getDeviceStationId = (device: any) => api.get(url.GET_DEVICE_BY_STATION_ID + '/' + device);
// get device by levelCrossing id
export const getDeviceLevelCrossingId = (device: any) => api.get(url.GET_DEVICE_BY_LEVELCROSSING_ID + '/' + device);
// get all device
export const getAllDevice = () => api.get(url.GET_ALL_DEVICE);
// get all simple device
export const getAllSimpleDevice = () => api.get(url.GET_ALL_SIMPLE_DEVICE);
// get all level crossing device
export const getAllLevelCrossingDevice = () => api.get(url.GET_ALL_LEVEL_CROSSING_DEVICE);
// get all device info action
export const getAllDeviceInfoActions = (device: any) => api.get(url.GET_ALL_DEVICE_INFO_ACTIONS, device);
// add New device
export const addNewDevice = (device: any) => api.create(url.ADD_NEW_DEVICE, device);
// update  device
export const updateDevice = (device: any) => api.put(url.UPDATE_DEVICE + '/' + device.id, device);
export const deleteDevice = (device: any) => api.delete(url.DELETE_DEVICE + '/' + device);


// get mtu
export const getAllMtu = () => api.get(url.GET_ALL_MTU);
// get mtu by id
export const getMtuById = (mtu: any) => api.get(url.GET_MTU_BY_ID, mtu);
// add New mtu
export const addNewMtu = (mtu: any) => api.create(url.ADD_NEW_MTU, mtu);
// update  mtu
export const updateMtu = (mtu: any) => api.put(url.UPDATE_MTU + '/' + mtu.id, mtu);
export const deleteMtu = (mtu: any) => api.delete(url.DELETE_MTU + '/' + mtu);


// get enterprise
export const getAllEnterprise = () => api.get(url.GET_ALL_ENTERPRISE);
// get enterprise by id
export const getEnterpriseById = (enterprise: any) => api.get(url.GET_ENTERPRISE_BY_ID, enterprise);
// get enterprise by mtu
export const getEnterpriseByMTU = (enterprise: any) => api.get(url.GET_ENTERPRISE_BY_MTU + '/' + enterprise);
// add New enterprise
export const addNewEnterprise = (enterprise: any) => api.create(url.ADD_NEW_ENTERPRISE, enterprise);
// update  enterprise
export const updateEnterprise = (enterprise: any) => api.put(url.UPDATE_ENTERPRISE + '/' + enterprise.id, enterprise);
// delete enterprise
export const deleteEnterprise = (enterprise: any) => api.delete(url.DELETE_ENTERPRISE + '/' + enterprise);


// get plot
export const getAllPlot = () => api.get(url.GET_ALL_PLOT);
// get plot by id
export const getPlotById = (plot: any) => api.get(url.GET_PLOT_BY_ID, plot);
// get plot by mtu
export const getPlotByEnterprise = (plot: any) => api.get(url.GET_PLOT_BY_ENTERPRISE + '/' + plot);
// add New plot
export const addNewPlot = (plot: any) => api.create(url.ADD_NEW_PLOT, plot);
// update  plot
export const updatePlot = (plot: any) => api.put(url.UPDATE_PLOT + '/' + plot.id, plot);
// delete  plot
export const deletePlot = (plot: any) => api.delete(url.DELETE_PLOT + '/' + plot);

// get level crossing
export const getAllLevelCrossing = () => api.get(url.GET_ALL_LEVEL_CROSSING);
// get level crossing by id
export const getLevelCrossingById = (levelCrossing: any) => api.get(url.GET_LEVEL_CROSSING_BY_ID, levelCrossing);
// get level crossing by plot
export const getLevelCrossingByPlot = (levelCrossing: any) => api.get(url.GET_LEVEL_CROSSING_BY_PLOT + '/' + levelCrossing);
// add New level crossing
export const addNewLevelCrossing = (levelCrossing: any) => api.create(url.ADD_NEW_LEVEL_CROSSING, levelCrossing);
// update  level crossing
export const updateLevelCrossing = (levelCrossing: any) => api.put(url.UPDATE_LEVEL_CROSSING + '/' + levelCrossing.id, levelCrossing);
// delete level crossing
export const deleteLevelCrossing = (levelCrossing: any) => api.delete(url.DELETE_LEVEL_CROSSING + '/' + levelCrossing);

// get all category for select
export const getAllCategoryForSelect = () => api.get(url.GET_ALL_CATEGORY_FOR_SELECT);
// get category
export const getAllCategory = (params: any) => api.get(url.GET_ALL_CATEGORY + '/' + params.isStation + '/' + params.isLevelCrossing + '/' + params.isPeregon);
// get category by id
export const getCategoryById = (category: any) => api.get(url.GET_CATEGORY_BY_ID, category);
// get category by mtu
// add New category
export const addNewCategory = (category: any) => api.create(url.ADD_NEW_CATEGORY, category);
// update  category
export const updateCategory = (category: any) => api.put(url.UPDATE_CATEGORY + '/' + category.id, category);
// delete  category
export const deleteCategory = (category: any) => api.delete(url.DELETE_CATEGORY + '/' + category);


// get all peregon
export const getAllPeregon = () => api.get(url.GET_ALL_PEREGON);
// get peregon by id
export const getPeregonById = (station: any) => api.get(url.GET_PEREGON_BY_ID, station);
// get peregon by plot id
export const getPeregonByPlotId = (station: any) => api.get(url.GET_PEREGON_BY_PLOT_ID + '/' + station);
// add New peregon
export const addNewPeregon = (station: any) => api.create(url.ADD_NEW_PEREGON, station);
// update  peregon
export const updatePeregon = (station: any) => api.put(url.UPDATE_PEREGON + '/' + station.id, station);
// delete  peregon
export const deletePeregon = (station: any) => api.delete(url.DELETE_PEREGON + '/' + station);


// get all employee
export const getAllEmployee = () => api.get(url.GET_ALL_EMPLOYEE);
// get employee by id
export const getEmployeeById = (user: any) => api.get(url.GET_EMPLOYEE_BY_ID, user);
// add New employee
export const addNewEmployee = (user: any) => api.create(url.ADD_NEW_EMPLOYEE, user);
// update  employee
export const updateEmployee = (user: any) => api.put(url.UPDATE_EMPLOYEE + '/' + user.id, user);
// delete employee
export const getEmployeeByEnterPrise = (user: any) => api.delete(url.GET_EMPLOYEE_ENTERPRISE, user);


// get all roles
export const getAllRoles = () => api.get(url.GET_ALL_ROLES);


// get work example
export const getAllWorkExample = () => api.get(url.GET_ALL_WORK_EXAMPLE);
// get work example by id
export const getWorkExampleById = (workExample: any) => api.get(url.GET_WORK_EXAMPLE_BY_ID, workExample);
// add New work example
export const addNewWorkExample = (workExample: any) => api.create(url.ADD_NEW_WORK_EXAMPLE, workExample);
// update  work example
export const updateWorkExample = (workExample: any) => api.put(url.UPDATE_WORK_EXAMPLE + '/' + workExample.id, workExample);
// delete work example
export const deleteWorkExample = (workExample: any) => api.delete(url.DELETE_WORK_EXAMPLE + '/' + workExample);