import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addNewStation, updateStation } from '../../slices/station/thunk.ts';
import { Button } from 'reactstrap';


export const AddStation = ({ modalOpen, setModalOpen, item, setItem }: any) => {
  const dispatch: any = useDispatch();
  const { loading, isAction, isSuccess } = useSelector((state: any) => state.Station);
  const { plot } = useSelector((state: any) => state.Plot);
  const [initialValues, setInitialValues] = useState({
    name: '',
    plotId: '',
    description: '',
    address: '',
    latitude: 0,
    longitude: 0
  });

  function tog_standard() {
    setModalOpen(!modalOpen);
    setInitialValues({
      name: '',
      plotId: '',
      description: '',
      address: '',
      latitude: 0,
      longitude: 0
    });
  }

  const getUserLocation = () => {
    console.log('ewef');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          let formValues = initialValues;
          formValues.latitude = latitude;
          formValues.longitude = longitude;
          let a = { ...formValues };
          console.log(a);
          setInitialValues(a);
        },

        (error) => {
          console.error('Error get user location: ', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser');
    }
  };

  useEffect(() => {
    if (item) {
      setInitialValues({
        name: item?.name,
        description: item?.description,
        address: item?.description,
        latitude: item?.latitude,
        longitude: item?.longitude,
        plotId: item?.plotId
      });
    }
  }, [item]);

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required('Stansiya nomini kiriting!'),
      description: Yup.string().required('Namuna ish!'),
      address: Yup.string().required('Stansiya nomini kiriting!'),
      plotId: Yup.string().required('Uchastkani  tanlang!'),
      latitude: Yup.string().required('Stansiya koordinatasini kiriting!'),
      longitude: Yup.string().required('Stansiya koordinatasini kiriting!')
    }),
    onSubmit: (values) => {
      if (item) {
        dispatch(updateStation({ ...values, id: item.id }));
      } else {
        dispatch(addNewStation(values));
      }
    }
  });


  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      validation.resetForm();
      setItem(null);
      setInitialValues({
        name: '',
        description: '',
        address: '',
        latitude: 0,
        longitude: 0,
        plotId: ''
      });
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
            <h4 className={'text-title-md2 font-semibold text-black dark:text-white'}>Stansiya yaratish</h4>
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
                    Stansiya nomi
                  </label>
                  <input
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.name || ''}
                    name="name"
                    type="text"
                    placeholder="Stansiya nomi"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Stansiya manzili
                  </label>
                  <input
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.address || ''}
                    name="address"
                    type="text"
                    placeholder="Stansiya manzili"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    {' '}
                    Uchastka tanlang
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={validation.values.plotId || ''}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      name="plotId"
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                    >
                      <option value="" className="text-body dark:text-bodydark">
                        Uchastka tanlang
                      </option>
                      {
                        plot.map((item: any) =>
                          <option value={item.id} className="text-body dark:text-bodydark">
                            {item.name}
                          </option>
                        )
                      }
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
                {/*<Button*/}
                {/*  onClick={getUserLocation}*/}
                {/*  className="inline-flex items-center justify-center gap-2.5 border border-primary py-2 px-5 text-center font-semibold text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"*/}
                {/*>*/}
                {/*  Stansiya koordinatasini olish(avtomatik)*/}
                {/*</Button>*/}
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Stansiya koordinatasi(latitude)
                  </label>
                  <input
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.latitude || ''}
                    name="latitude"
                    type="number"
                    placeholder="latitude"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Stansiya koordinatasi(longitude)
                  </label>
                  <input
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.longitude || ''}
                    name="longitude"
                    type="number"
                    placeholder="longitude"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tavsif
                  </label>
                  <input
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.description || ''}
                    name="description"
                    type="text"
                    placeholder="description"
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