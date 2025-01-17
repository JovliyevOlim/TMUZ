import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { clearCheckUser } from '../../slices/action/reducer.ts';
import { addNewAction, updateAction } from '../../slices/action/thunk.ts';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import axios from 'axios';
import { baseUrl } from '../../helpers/api_helpers.ts';
import { toast } from 'react-toastify';


export const AddNewAction = ({ modalOpen, setModalOpen, item, setItem }: any) => {
  const dispatch: any = useDispatch();
  const { loading, deviceQrCodeInfo } = useSelector((state: any) => state.Device);
  const { userId } = useSelector((state: any) => state.Login);
  const { isAction, isSuccess } = useSelector((state: any) => state.Action);
  const [initialValues, setInitialValues] = useState({
    description: ''
  });

  function tog_standard() {
    setModalOpen(!modalOpen);
    dispatch(clearCheckUser());
  }

  useEffect(() => {
    if (item) {
      setInitialValues({
        description: item?.description
      });
    }
  }, [item]);

  const getToken = (): string | null => {
    const authUser = localStorage.getItem('authUser');
    if (authUser) {
      try {
        const parsedAuthUser = JSON.parse(authUser);
        return parsedAuthUser?.token || null;
      } catch (error) {
        console.error('Error parsing authUser:', error);
        return null;
      }
    }
    return null;
  };

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: initialValues,
    validationSchema: Yup.object({
      description: Yup.string().required('Ish tavsifi!')
    }),
    onSubmit: (values) => {
      if (item) {
        dispatch(updateAction({ ...values, id: item.id }));
      } else {
        try {
          const responseImg: any = axios.post(baseUrl + '/action/create', {
            ...values,
            deviceId: deviceQrCodeInfo?.deviceDto?.id,
            userId
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getToken()}`
            }
          });
          toast.success('Action qo\'shildi', { autoClose: 3000 });
          setModalOpen(false);
          validation.resetForm();
          setItem(null);
          setInitialValues({
            description: ''
          });
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    }
  });


  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      validation.resetForm();
      setItem(null);
      setInitialValues({
        description: ''
      });
      dispatch(clearCheckUser());
    }
  }, [dispatch, isAction]);

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
                  <h5 className={'text-title-md font-semibold text-black dark:text-white '}>Ish qilish</h5>
                </div>
                <div className={'my-2'}>
                  <label htmlFor="description" className="block text-md font-medium leading-6 text-gray-900">
                    Ish tavsifi
                  </label>
                  <div className="mt-2">
                    <input
                      id="description"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.description || ''}
                      name="description"
                      type="text"
                      placeholder="tavsif"
                      className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1 ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
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