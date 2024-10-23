import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { loginUserOther } from '../../slices/auth/thunk.ts';


export const Login = ({ modalOpen, setModalOpen }: any) => {
  const dispatch: any = useDispatch();
  const { loading} = useSelector((state: any) => state.Login);

  function tog_standard() {
    setModalOpen(!modalOpen);
  }

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Please Enter Your Username'),
      password: Yup.string().required('Please Enter Your Password')
    }),
    onSubmit: (values) => {
      dispatch(loginUserOther(values));
      setModalOpen(modalOpen)
    }
  });



  return (
    <Dialog open={modalOpen} onClose={tog_standard} className="relative z-9999">
      <DialogBackdrop
        transition
        className="fixed inset-0  bg-black bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          className="flex min-h-150 sm:min-h-full items-center sm:items-end sm:w-full justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform w-full overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="divide-y divide-blue-200">
                  <h5 className={'text-title-md font-semibold text-black dark:text-white '}>Login</h5>
                </div>
                <div className={'my-2'}>
                  <label htmlFor="username" className="block text-md font-medium leading-6 text-gray-900">
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.username || ''}
                      name="username"
                      type="text"
                      placeholder="username"
                      className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1 ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {validation.touched.username && validation.errors.username ? (
                    <h6 className="block text-md font-medium leading-6 text-red-900">
                      {validation.errors.username}
                    </h6>
                  ) : null}
                </div>
                <div className={'my-2'}>
                  <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.password || ''}
                      name="password"
                      type="password"
                      placeholder="password"
                      className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1 ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {validation.touched.password && validation.errors.password ? (
                    <h6 className="block text-md font-medium leading-6 text-red-900">
                      {validation.errors.password}
                    </h6>
                  ) : null}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 flex justify-end gap-2  sm:px-6">
                <button
                  type="button"
                  onClick={tog_standard}
                  className=" justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className="flex justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-blue-800 hover:bg-blue-600 sm:mt-0 sm:w-auto"
                >
                  Save
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>

  );
};