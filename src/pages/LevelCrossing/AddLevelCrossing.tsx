import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { addNewLevelCrossing, updateLevelCrossing } from '../../slices/levelCrossing/thunk.ts';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';


export const AddLevelCrossing = ({ modalOpen, setModalOpen, item, setItem }: any) => {
  const dispatch: any = useDispatch();
  const { loading, isAction, isSuccess } = useSelector((state: any) => state.LevelCrossing);
  const { plot } = useSelector((state: any) => state.Plot);

  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    address: '',
    plotId: '',
    latitude: 0,
    longitude: 0
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
    setInitialValues({
      name: '',
      description: '',
      address: '',
      plotId: '',
      latitude: 0,
      longitude: 0
    });
    setItem(null);
    validation.resetForm();
  }

  useEffect(() => {
    if (item) {
      setInitialValues({
        name: item?.name,
        description: item?.description,
        address: item?.address,
        plotId: item?.plotId,
        latitude: item?.latitude,
        longitude: item?.longitude
      });
    } else {
      setInitialValues({
        name: '',
        description: '',
        address: '',
        plotId: '',
        latitude: 0,
        longitude: 0
      });
      validation.resetForm();
    }
  }, [item]);

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required('Stansiya nomini kiriting!'),
      description: Yup.string().required('Namuna ish!'),
      address: Yup.string().required('Manzilni kiriting!'),
      latitude: Yup.string().required('Stansiya koordinatasini kiriting!'),
      longitude: Yup.string().required('Stansiya koordinatasini kiriting!')
    }),
    onSubmit: (values) => {
      if (item) {
        dispatch(updateLevelCrossing({ ...values, id: item.id }));
      } else {
        dispatch(addNewLevelCrossing(values));
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
        plotId: '',
        latitude: 0,
        longitude: 0
      });
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
                  <h5 className={'text-title-md font-semibold text-black dark:text-white '}>Temiryo'l kesishmasi</h5>
                </div>
                <div className={'my-2'}>
                  <label htmlFor="name" className="block text-md font-medium leading-6 text-gray-900">
                    Kesishmasi nomi
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.name || ''}
                      placeholder="Kesishmasi nomi"
                      className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1
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
                      className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1 ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {validation.touched.address && validation.errors.address ? (
                    <h6 className="block text-md font-medium leading-6 text-red-900">
                      {validation.errors.address}
                    </h6>
                  ) : null}
                </div>
                <div className={'my-2'}>
                  <label htmlFor="plotId" className="block text-md font-medium leading-6 text-gray-900">
                    Uchastka
                  </label>
                  <div className="mt-2">
                    <div className="relative inline-block w-full">
                      <select
                        id="plotId"
                        name="plotId"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.plotId || ''}
                        className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1
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
                <div className={' sm:flex  gap-3'}>
                  <div className={'my-2 sm:w-1/2'}>
                    <label htmlFor="latitude" className="block text-md font-medium leading-6 text-gray-900">
                      Koordinata (latitude)
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
                        className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1 ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      Koordinata (longitude)
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
                        className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1 ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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