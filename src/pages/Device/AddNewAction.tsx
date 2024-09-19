import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { clearCheckUser } from '../../slices/action/reducer.ts';
import { addNewAction, updateAction } from '../../slices/action/thunk.ts';


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
        dispatch(addNewAction({ ...values, deviceId: deviceQrCodeInfo?.deviceDto?.id, userId }));
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
    modalOpen &&
    <div
      className="modal-container fixed z-50 flex top-25 bottom-5 backdrop-blur-sm bg-black bg-opacity-50"
    >
      <div
        className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
        <div className="py-4 px-4 dark:border-strokedark">
          <div className="w-full flex justify-between">
            <h4 className={'text-title-md2 font-semibold text-black dark:text-white'}>Ish qilish</h4>
            <strong className="text-xl align-center cursor-pointer "
                    onClick={tog_standard}
            >&times;</strong>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <div className="grid grid-cols-4 gap-5 justify-normal">
              <div>

              </div>
            </div>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Ish tavsifi
                  </label>
                  <input
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.description || ''}
                    name="description"
                    type="text"
                    placeholder="tavsif"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading && true}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Saqlash
                {/*<svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">*/}
                {/*</svg>*/}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};