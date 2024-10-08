import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addNewDevice, getDeviceByCategoryId, updateDevice } from '../../slices/device/thunk.ts';
import { Button } from 'reactstrap';
import { getStationByPlotId } from '../../slices/station/thunk.ts';


export const AddDeviceExtra = ({ modalOpen, setModalOpen, item, setItem }: any) => {
  const dispatch: any = useDispatch();
  const { loading, isAction, isSuccess, devices } = useSelector((state: any) => state.Device);
  const { stations } = useSelector((state: any) => state.Station);
  const { plot } = useSelector((state: any) => state.Plot);
  const [deviceItem, setDeviceItem] = useState<any>(null);
  const [initialValues, setInitialValues] = useState({
    name: '',
    station: true,
    description: '',
    stationId: '',
    categoryId: '',
    latitude: 0,
    longitude: 0,
    plotId: ''
  });


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


  function tog_standard() {
    setModalOpen(!modalOpen);
  }

  useEffect(() => {
    if (deviceItem) {
      setInitialValues({
        name: deviceItem?.name,
        station: true,
        description: deviceItem?.description,
        stationId: deviceItem?.stationId,
        categoryId: deviceItem?.id,
        latitude: deviceItem?.latitude,
        longitude: deviceItem?.longitude,
        plotId: deviceItem?.plotId
      });
    }
  }, [deviceItem]);

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required('Stansiya nomini kiriting!'),
      description: Yup.string().required('Namuna ish!'),
      latitude: Yup.string().required('Stansiya koordinatasini kiriting!'),
      longitude: Yup.string().required('Stansiya koordinatasini kiriting!')
    }),
    onSubmit: (values) => {
      if (deviceItem) {
        dispatch(updateDevice({ ...values, id: deviceItem.id, categoryId: item?.id }));
      } else {
        dispatch(addNewDevice({ ...values, categoryId: item?.id }));
      }
    }
  });


  useEffect(() => {
    if (isSuccess) {
      validation.resetForm();
      setDeviceItem(null);
      setInitialValues({
        name: '',
        station: true,
        description: '',
        stationId: '',
        latitude: 0,
        longitude: 0,
        plotId: '',
        categoryId: ''
      });
    }
  }, [dispatch, isAction]);

  useEffect(() => {
    if (validation.values.plotId) {
      dispatch(getStationByPlotId(validation.values.plotId));
    }
  }, [validation.values.plotId]);

  useEffect(() => {
    if (item) {
      dispatch(getDeviceByCategoryId(item?.id));
    }
  }, [item, isAction]);

  return (
    modalOpen &&
    <div
      className="modal-container fixed z-50 flex top-25 bottom-5 backdrop-blur-sm bg-black bg-opacity-50"
    >
      <div
        className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
        <div className="py-4 px-4 dark:border-strokedark">
          <div className="w-full flex justify-between">
            <h4 className={'text-title-md2 font-semibold text-black dark:text-white'}>Qurilma tahrirlash</h4>
            <strong className="text-xl align-center cursor-pointer "
                    onClick={tog_standard}
            >&times;</strong>
          </div>
          <div className="flex">
            <div className="w-1/2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className="p-6.5">
                  <div className="mb-4.5">
                    <div className="w-full">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Qurilma nomi
                      </label>
                      <input
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name || ''}
                        name="name"
                        type="text"
                        placeholder="Qurilma nomi"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full">
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
                    <div className="w-full">
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

                    <div className="w-full">
                      <label className="mb-2.5 block text-black dark:text-white">
                        {' '}
                        Stansiyani tanlang
                      </label>

                      <div className="relative z-20 bg-transparent dark:bg-form-input">
                        <select
                          value={validation.values.stationId || ''}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          name="stationId"
                          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                        >
                          <option value="" className="text-body dark:text-bodydark">
                            Stansiya tanlang
                          </option>
                          {
                            stations.map((item: any) =>
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
                    {/*  Qurilma koordinatasini olish(avtomatik)*/}
                    {/*</Button>*/}
                    <div className="w-full">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Qurilma koordinatasi(latitude)
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
                    <div className="w-full">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Qurilma koordinatasi(longitude)
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

                  </div>

                  <button
                    type="submit"
                    disabled={loading && true}
                    className="w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    {
                      deviceItem ? 'Tahrirlash' : 'Saqlash'
                    }
                    {/*<svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">*/}
                    {/*</svg>*/}
                  </button>
                </div>
              </form>
            </div>
            <div className="w-3/4">
              <div
                className="bg-white px-5 pt-6 pb-2.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                  Qurilmalar
                </h4>

                <div className="flex flex-col">
                  <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4">
                    <div className="p-2.5 text-start xl:p-5">
                      <h5 className="text-sm font-medium uppercase xsm:text-base">
                        Nomi
                      </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                      <h5 className="text-sm font-medium uppercase xsm:text-base">
                        Tavsif
                      </h5>
                    </div>
                    <div className="p-2.5 text-center  xl:p-5">
                      <h5 className="text-sm font-medium uppercase xsm:text-base">
                        Action
                      </h5>
                    </div>
                  </div>

                  {devices?.map((item: any, key: number) => (
                    <div
                      className={`grid grid-cols-4 ${
                        key === devices?.length - 1
                          ? ''
                          : 'border-b border-stroke dark:border-strokedark'
                      }`}
                      key={key}
                    >
                      <div style={{ cursor: 'pointer' }} className="flex items-center gap-3 p-2.5 xl:p-5">
                        <p className="text-black dark:text-white sm:block">
                          {item.name}
                        </p>
                      </div>

                      <div className="flex items-center justify-center p-2.5 xl:p-5">
                        <p className="text-black dark:text-white">{item.description}</p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center p-2.5  gap-2 xl:p-5">
                        <Button
                          onClick={() => setDeviceItem(item)}
                          className="inline-flex items-center justify-center gap-2.5 border border-primary py-2 px-5 text-center font-semibold text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                          Edit
                        </Button>
                        <Button
                          // onClick={() => onClickQrCode(item)}
                          className="inline-flex items-center justify-center gap-2.5 border border-success py-2 px-5 text-center font-semibold text-success hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                          QrCode
                        </Button>
                        {/*<Button*/}
                        {/*  onClick={() => dispatch((item?.id))}*/}
                        {/*  className="inline-flex items-center justify-center gap-2.5 border border-danger py-2 px-5 text-center font-semibold text-danger hover:bg-opacity-90 lg:px-8 xl:px-10"*/}
                        {/*>*/}
                        {/*  Delete*/}
                        {/*</Button>*/}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>

  );
};