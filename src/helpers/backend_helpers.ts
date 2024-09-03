import { APIClient } from './api_helpers.ts';

import * as url from './url_helper';

const api = new APIClient();


// add New User
export const addNewUser = (user: any) => api.create(url.ADD_NEW_USER, user);
// add New Work
export const addNewWork = (work: any) => api.create(url.ADD_NEW_WORK, work);