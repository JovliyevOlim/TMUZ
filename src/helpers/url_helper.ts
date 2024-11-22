// auth
export const POST_LOGIN = '/auth/login';


// add new user
export const ADD_NEW_USER = '/user/create';
export const UPDATE_USER = '/user/edit';
export const GET_ALL_USER = '/user/get-all-user';
export const GET_USER_BY_ID = '/user/get-by-id';
export const DELETE_USER = '/user/delete-by-id';

// add new work
export const ADD_NEW_JOB = '/job/create';
export const UPDATE_JOB = '/job/edit';
export const DELETE_JOB = '/job';
export const GET_ALL_JOB = '/job/getAll';
export const GET_ONE_JOB = '/job';

// Stations
export const ADD_NEW_STATION = '/station/create';
export const UPDATE_STATION = '/station/edit';
export const DELETE_STATION = '/station/delete';
export const GET_ALL_STATION = '/station/get-all';
export const GET_STATION_BY_ID = '/station/get-by-id';
export const GET_STATION_BY_PLOT_ID = '/station/get-by-plot-id';


// Action
export const ADD_NEW_ACTION = '/action/create';
export const UPDATE_ACTION = '/action/edit-done';
export const DELETE_ACTION = '/action/delete';
export const CHECK_DEVICE_FOR_ACTION = '/action/check-user';
export const GET_ACTION_BY_USER = '/action/get-by-user-done';
export const GET_ACTION_BY_USER_FALSE = '/action/get-by-user-done-is-false';

// LevelCrossingDevice
export const ADD_NEW_DEVICE = '/device/create';
export const UPDATE_DEVICE = '/device/edit';
export const DELETE_DEVICE = '/device';
export const GET_DEVICE_INFO_FOR_QR = '/device/get-info-for-QR';
export const GET_DEVICE_BY_ID = '/device/get-by-id';
export const GET_ALL_DEVICE = '/device/get-all';
export const GET_DEVICE_BY_CATEGORY_ID = '/device/get-by-category';
export const GET_DEVICE_BY_CATEGORY_ID_PLOT_ID = '/device/get-by-category-plot';
export const GET_DEVICE_BY_STATION_ID = '/device/get-by-stationId';
export const GET_DEVICE_BY_LEVELCROSSING_ID = '/device/get-by-levelCrossingId';
export const GET_ALL_SIMPLE_DEVICE = '/device/get-by-isStation-true';
export const GET_ALL_LEVEL_CROSSING_DEVICE = '/device/get-by-isStation-false';
export const GET_ALL_DEVICE_INFO_ACTIONS = '/device/get-all-info-actions';

// MTU
export const ADD_NEW_MTU = '/mtu/create';
export const UPDATE_MTU = '/mtu/edit';
export const GET_ALL_MTU = '/mtu/get-all';
export const GET_MTU_BY_ID = '/mtu/get-by-id';
export const DELETE_MTU = '/mtu/delete';


// EnterPrise
export const ADD_NEW_ENTERPRISE = '/enterprise/create';
export const UPDATE_ENTERPRISE = '/enterprise/edit';
export const DELETE_ENTERPRISE = '/enterprise/delete';
export const GET_ALL_ENTERPRISE = '/enterprise/get-all';
export const GET_ENTERPRISE_BY_ID = '/enterprise/get-by-id';
export const GET_ENTERPRISE_BY_MTU = '/enterprise/get-by-mtu';


// plot
export const ADD_NEW_PLOT = '/plot/create';
export const UPDATE_PLOT = '/plot/edit';
export const DELETE_PLOT = '/plot/delete';
export const GET_ALL_PLOT = '/plot/get-all';
export const GET_PLOT_BY_ID = '/plot/get-by-id';
export const GET_PLOT_BY_ENTERPRISE = '/plot/get-by-enterprise';


// levelCrossing
export const ADD_NEW_LEVEL_CROSSING = '/level-crossing';
export const UPDATE_LEVEL_CROSSING = '/level-crossing';
export const DELETE_LEVEL_CROSSING = '/level-crossing/delete';
export const GET_ALL_LEVEL_CROSSING = '/level-crossing';
export const GET_LEVEL_CROSSING_BY_ID = '/level-crossing';
export const GET_LEVEL_CROSSING_BY_PLOT = '/level-crossing/get-by-plot-id';

// category
export const ADD_NEW_CATEGORY = '/category/create';
export const UPDATE_CATEGORY = '/category/edit';
export const GET_ALL_CATEGORY = '/category/get-by-is-station';
export const GET_ALL_CATEGORY_FOR_SELECT = '/category';
export const GET_CATEGORY_BY_ID = '/category/get-by-id';
export const DELETE_CATEGORY = '/category/delete';

//Peregon
export const ADD_NEW_PEREGON = '/peregon/create';
export const UPDATE_PEREGON = '/peregon/edit';
export const DELETE_PEREGON = '/peregon/delete';
export const GET_ALL_PEREGON = '/peregon/get-all';
export const GET_PEREGON_BY_ID = '/peregon/get-by-id';
export const GET_PEREGON_BY_PLOT_ID = '/peregon/get-by-plot-id';


// add new employee
export const ADD_NEW_EMPLOYEE = '/employee';
export const UPDATE_EMPLOYEE = '/employee/edit';
export const GET_ALL_EMPLOYEE = '/employee';
export const GET_EMPLOYEE_BY_ID = '/employee/get-by-id';
export const GET_EMPLOYEE_ENTERPRISE = '/employee/get-by-enterpriseId';


// get roles
export const GET_ALL_ROLES = '/role/get-all-roles';