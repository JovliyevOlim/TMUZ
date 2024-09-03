import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addNewWork } from '../../slices/work/thunk.ts';


export const AddWorks = ({ modalOpen, setModalOpen }: any) => {
  const dispatch: any = useDispatch();
  const [initialValues, setInitialValues] = useState({
    name: '',
    example: '',
    company: '',
    exampleId: ''
  });

  function tog_standard() {
    setModalOpen(!modalOpen);
  }

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: initialValues,
    validationSchema: Yup.object({
      companyId: Yup.string().required('Korxonani tanlang !'),
      exampleId: Yup.string().required(''),
      example: Yup.string().required('Namuna ish!'),
      roleId: Yup.string().required('Lavozimini tanlang')
    }),
    onSubmit: (values) => {
      dispatch(addNewWork(values));
    }
  });


  console.log(initialValues);

  return (
    modalOpen &&
    <div
      className="modal-container fixed z-50 flex top-25 bottom-5 backdrop-blur-sm bg-black bg-opacity-50"
    >
      <div
        className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
        <div className="py-4 px-4 dark:border-strokedark">
          <div className="w-full flex justify-between">
            <h3 className={'text-title-md2 font-semibold text-black dark:text-white'}>Rejaviy kundalik ish yaratish</h3>
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
                    Korxona
                  </label>
                  <input
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.companyId || ''}
                    name="companyId"
                    type="text"
                    placeholder="F.I.O"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {' '}
                    Ish kiritish namunalari{' '}
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={validation.values.exampleId}
                      onChange={(e) => {
                        validation.handleChange(e);
                        setInitialValues({ ...initialValues, example: validation?.values?.exampleId });
                      }}
                      onBlur={validation.handleBlur}
                      name="exampleId"
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    >
                      <option value="" className="text-body dark:text-bodydark">
                        Ishni qo'lda kiritish
                      </option>
                      <option value="Birinchi ish" className="text-body dark:text-bodydark">
                        Birinchi ish
                      </option>
                      <option value="Ikkinchi ish" className="text-body dark:text-bodydark">
                        Ikkinchi ish
                      </option>
                      <option value="Uchinchi ish" className="text-body dark:text-bodydark">
                        Uchinchi ish
                      </option>
                    </select>

                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill=""
              ></path>
            </g>
          </svg>
        </span>
                  </div>
                </div>


              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Ish kiritish namunasi
                  </label>
                  <textarea
                    rows={6}
                    value={validation.values.example || validation.values.exampleId}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    name="example"
                    placeholder="Namuna"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Saqlash
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};