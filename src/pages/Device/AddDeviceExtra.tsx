import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewDevice, deleteDevice,
  getDeviceByCategoryId,
  getDeviceByPlotId,
  updateDevice
} from '../../slices/device/thunk.ts';
import { getStationByPlotId } from '../../slices/station/thunk.ts';
import { DeviceQrCode } from './DeviceQrCode.tsx';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import DeleteModal from '../../components/DeleteModal.tsx';


export const AddDeviceExtra = ({ modalOpen, setModalOpen, item, setItem }: any) => {
  const dispatch: any = useDispatch();
  const { loading, isAction, isSuccess, devices } = useSelector((state: any) => state.Device);
  const [addOpen, setAddOpen] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const { stations } = useSelector((state: any) => state.Station);
  const { plot } = useSelector((state: any) => state.Plot);
  const [deviceItem, setDeviceItem] = useState<any>(null);
  const [qrCodemodal, setQrCodeModal] = useState(false);
  const [stationId, setStationId] = useState<any>(null);
  const [plotId, setPlotId] = useState<any>(null);
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


  const onClickQrCode = (data: any) => {
    setQrCodeModal(true);
    setDeviceItem(data);
  };

  const onClickDelete = (data: any) => {
    setModalDelete(true);
    setDeviceItem(data);
  };

  const deleteFunction = () => {
    dispatch(deleteDevice(deviceItem?.id));
    setModalDelete(false);
  };

  function tog_standard() {
    setAddOpen(!addOpen);
    setItem(null);
    setDeviceItem(null);
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
      name: Yup.string().required('Qurilma nomini kiriting!'),
      stationId: Yup.string().required('Stansiyani tanlang!'),
      latitude: Yup.string().required('Qurilma koordinatasini kiriting!'),
      longitude: Yup.string().required('Qurilma koordinatasini kiriting!')
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
      setDeviceItem(null);
      setAddOpen(false);
      setInitialValues({
        ...item,
        name: '',
        station: true,
        description: '',


        stationId: stationId,
        plotId: plotId,
        latitude: 0,
        longitude: 0
      });
    }
  }, [dispatch, isAction]);

  useEffect(() => {
    if (plotId) {
      dispatch(getStationByPlotId(plotId));
    }
  }, [plotId]);

  useEffect(() => {
    if (item) {
      if (plotId) {
        dispatch(getDeviceByPlotId({
          plotId: plotId,
          categoryId: item.id,
          params: {
            stationId: stationId
          }
        }));
      } else {
        dispatch(getDeviceByCategoryId(item?.id));
      }
    }
  }, [item, isAction, stationId, plotId]);


  return (
    <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="relative z-9999">
      <DialogBackdrop
        transition
        className="fixed inset-0  bg-black bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-500 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          className="flex min-h-150 sm:min-h-full items-center sm:items-end sm:w-full justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform w-full overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all
             data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300
             data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8
             sm:w-full sm:max-w-6xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="divide-y divide-blue-200 flex justify-between align-middle py-4">
                <h5 className={'text-title-md font-semibold text-black dark:text-white '}>Qurilmalar</h5>
                <button
                  onClick={() => setAddOpen(true)}
                  className="flex items-center gap-2 justify-center rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Qurilma yaratish
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                       stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>

                </button>
              </div>
              <div className="flex gap-4">
                <div className={'basis-1/2 '}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    <div>
                      <div className={'my-2'}>
                        <label htmlFor="plotId" className="block text-md font-medium leading-6 text-gray-900">
                          Uchastka
                        </label>
                        <div className="mt-2">
                          <div className="relative inline-block w-full">
                            <select
                              id="plotId"
                              name="plotId"
                              onChange={(e: any) => {
                                validation.handleChange(e);
                                setPlotId(e.target.value);
                              }}
                              onBlur={validation.handleBlur}
                              value={validation.values.plotId}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                              <option value="" className="text-body dark:text-bodydark">
                                Tanlang
                              </option>
                              {
                                plot.map((item: any) =>
                                  <option value={item.id} className="text-body dark:text-bodydark">
                                    {item.name}
                                  </option>
                                )
                              }
                            </select>
                          </div>
                        </div>
                        {validation.touched.plotId && validation.errors.plotId ? (
                          <h6 className="block text-md font-medium leading-6 text-red-900">
                            {validation.errors.plotId}
                          </h6>
                        ) : null}
                      </div>
                      {
                        plotId &&
                        <div className={'my-2'}>
                          <label htmlFor="stationId" className="block text-md font-medium leading-6 text-gray-900">
                            Stansiya
                          </label>
                          <div className="mt-2">
                            <div className="relative inline-block w-full">
                              <select
                                id="stationId"
                                name="stationId"
                                onChange={(e: any) => {
                                  validation.handleChange(e);
                                  setStationId(e.target.value);
                                }}
                                onBlur={validation.handleBlur}
                                value={validation.values.stationId || ''}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <option value="" className="text-body dark:text-bodydark">
                                  Tanlang
                                </option>
                                {
                                  stations.map((item: any) =>
                                    <option value={item.id} className="text-body dark:text-bodydark">
                                      {item.name}
                                    </option>
                                  )
                                }
                              </select>
                            </div>
                          </div>
                          {validation.touched.stationId && validation.errors.stationId ? (
                            <h6 className="block text-md font-medium leading-6 text-red-900">
                              {validation.errors.stationId}
                            </h6>
                          ) : null}
                        </div>
                      }
                      {
                        addOpen && <>
                          <div className={'my-2'}>
                            <label htmlFor="name" className="block text-md font-medium leading-6 text-gray-900">
                              Qurilma nomi
                            </label>
                            <div className="mt-2">
                              <input
                                id="name"
                                name="name"
                                type="text"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.name || ''}
                                placeholder="Qurilma nomi"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            {validation.touched.name && validation.errors.name ? (
                              <h6 className="block text-md font-medium leading-6 text-red-900">
                                {validation.errors.name}
                              </h6>
                            ) : null}
                          </div>
                          <div className={'my-2'}>
                            <label htmlFor="address" className="block text-md font-medium leading-6 text-gray-900">
                              Manzil
                            </label>
                            <div className="mt-2">
                              <input
                                id="address"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.address || ''}
                                name="address"
                                type="text"
                                placeholder="Manzil"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            {validation.touched.address && validation.errors.address ? (
                              <h6 className="block text-md font-medium leading-6 text-red-900">
                                {validation.errors.address}
                              </h6>
                            ) : null}
                          </div>
                          <div className={'my-2 sm:w-1/2'}>
                            <button
                              type="button"
                              onClick={getUserLocation}
                              className=" justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                              Koordinatani avtomatik olish
                            </button>
                          </div>
                          <div className={' sm:flex  gap-3'}>
                            <div className={'my-2 sm:w-1/2'}>
                              <label htmlFor="latitude" className="block text-md font-medium leading-6 text-gray-900">
                                Koordinata(latitude)
                              </label>
                              <div className="mt-2">
                                <input
                                  id="latitude"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.latitude || ''}
                                  name="latitude"
                                  type="number"
                                  placeholder="latitude"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              {validation.touched.latitude && validation.errors.latitude ? (
                                <h6 className="block text-md font-medium leading-6 text-red-900">
                                  {validation.errors.latitude}
                                </h6>
                              ) : null}
                            </div>
                            <div className={'my-2 sm:w-1/2'}>
                              <label htmlFor="longitude" className="block text-md font-medium leading-6 text-gray-900">
                                Koordinata(longitude)
                              </label>
                              <div className="mt-2">
                                <input
                                  id="longitude"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.longitude || ''}
                                  name="longitude"
                                  type="number"
                                  placeholder="longitude"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                              {validation.touched.longitude && validation.errors.longitude ? (
                                <h6 className="block text-md font-medium leading-6 text-red-900">
                                  {validation.errors.longitude}
                                </h6>
                              ) : null}
                            </div>
                          </div>
                          <div className={'my-2'}>
                            <label htmlFor="description" className="block text-md font-medium leading-6 text-gray-900">
                              Tavsif
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </>
                      }

                    </div>
                    {
                      addOpen &&
                      <div className="bg-gray-50 px-4 py-3 flex justify-end gap-2">
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
                          {deviceItem ? 'Edit' : 'Save'}
                        </button>
                      </div>
                    }
                  </form>
                </div>
                <div className={'basis-3/4'}>
                  <div className="flex flex-col  border-2 rounded-2xl border-graydark">
                    <table className="table-fixed">
                      <thead>
                      <tr className="text-start text-sm font-medium uppercase xsm:text-base">
                        <th className="p-2.5 text-start">Nomi</th>
                        <th className="p-2.5 ext-start">Action</th>
                      </tr>
                      </thead>
                      <tbody>
                      {devices?.map((val: any, key: number) => (
                        <tr key={key}>
                          <td>
                            <div className={'flex items-center'}>
                              <p style={{ cursor: 'pointer' }} onClick={() => onClickQrCode(val)}
                                 className={`${val.check ? 'text-black' : 'text-danger'} p-2.5 text-black dark:text-white sm:block`}>
                                {val.name}
                              </p>
                              {
                                !val.check && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                   strokeWidth={1.5}
                                                   stroke="currentColor" className="size-5 text-danger">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                </svg>
                              }
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center justify-center p-2.5  gap-2 xl:p-5">
                              <button onClick={() => {
                                setAddOpen(true);
                                setDeviceItem(val);
                              }}
                                      className="flex items-center gap-2 justify-center rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                              </button>
                              <button onClick={() => onClickDelete(val)}
                                      className="flex items-center gap-2 justify-center rounded-md bg-red-600
                            px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500
                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="size-6">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-1 flex justify-end gap-2  sm:px-6">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className=" justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Cancel
              </button>
            </div>
            <DeleteModal modalOpen={modalDelete} setModalOpen={setModalDelete} text={'Qurilma'} setItem={setDeviceItem}
                         deleteFunction={deleteFunction} />
            <DeviceQrCode modalOpen={qrCodemodal} setModalOpen={setQrCodeModal} item={deviceItem}
                          setItem={setDeviceItem} />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};