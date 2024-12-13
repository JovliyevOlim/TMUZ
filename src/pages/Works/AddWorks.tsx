import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addNewJob, updateJob } from '../../slices/work/thunk.ts';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/20/solid';
import moment from 'moment';

export const AddWorks = ({ modalOpen, setModalOpen, item, setItem, daily }: any) => {
  const dispatch: any = useDispatch();
  const { loading, isAction, isSuccess, jobs } = useSelector((state: any) => state.Work);
  const { stations } = useSelector((state: any) => state.Station);
  const { workExample } = useSelector((state: any) => state.WorkExample);

  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    startTime: moment(new Date()).format('YYYY-MM-DD')
  });

  function tog_standard() {
    setModalOpen(!modalOpen);
  }

  useEffect(() => {
    if (item) {
      setInitialValues({
        name: item?.name,
        description: item?.description,
        startTime: moment(new Date()).format('YYYY-MM-DD')
      });
    }
  }, [item]);

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: initialValues,
    validationSchema: Yup.object({
      stationId: Yup.string().required('Stansiya tanlang !'),
      description: Yup.string().required('Namuna ish yozing yoki tanlang!')
    }),
    onSubmit: (values) => {
      if (item) {
        dispatch(updateJob({ ...values, year: !daily, id: item.id }));
      } else {
        dispatch(addNewJob({ ...values, year: !daily }));
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
        startTime: moment(new Date()).format('YYYY-MM-DD')
      });
    }
  }, [dispatch, isAction]);


  function shortString(selector: any) {
    const elements = document.querySelectorAll(selector);
    const tail = '...';
    if (elements && elements.length) {
      for (const element of elements) {
        let text = element.innerText;
        if (element.hasAttribute('data-limit')) {
          if (text.length > element.dataset.limit) {
            element.innerText = `${text.substring(0, element.dataset.limit - tail.length).trim()}${tail}`;
          }
        } else {
          throw Error('Cannot find attribute \'data-limit\'');
        }
      }
    }
  }

  window.onload = function() {
    shortString('.short');
  };

  return (
    <Dialog open={modalOpen} onClose={tog_standard} className="relative z-9999">
      <DialogBackdrop
        transition
        className="fixed inset-0   bg-black bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen  overflow-y-auto">
        <div
          className="flex min-h-150 w-full sm:min-h-full items-center sm:items-end sm:w-full justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform w-full  overflow-hidden
            rounded-lg bg-white text-left shadow-xl transition-all
            data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300
            data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full
             lg:w-7/12 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <div className="bg-white w-full  px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="divide-y divide-blue-200">
                  <h5
                    className={'text-title-md font-semibold text-black dark:text-white '}>Rejaviy {daily ? 'kundalik' : 'yillik'} ish
                    yaratish</h5>
                </div>
                <div className="flex gap-4">
                  <div className={'my-2 w-1/2'}>
                    <label htmlFor="startTime" className="block text-md font-medium leading-6 text-gray-900">
                      Sana
                    </label>
                    <div className="mt-2">
                      <div className="relative inline-block w-full">
                        <input
                          id="startTime"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.startTime || ''}
                          name="startTime"
                          type="date"
                          className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1 ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className={'my-2 w-1/2'}>
                    <label htmlFor="stationId" className="block text-md font-medium leading-6 text-gray-900">
                      Stansiya
                    </label>
                    <div className="mt-2">
                      <div className="relative inline-block w-full">
                        <select
                          id="stationId"
                          name="stationId"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.stationId || ''}
                          className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1
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
                  <div className={'my-2 w-1/2'}>
                    <Listbox value={validation.values.description || 'Tanlang'}
                             onChange={(value) => {
                               validation.setFieldValue('description', value);
                               validation.setFieldValue('name', value);
                             }}>
                      <Label className="block text-md font-medium leading-6 text-gray-900">Ish tavsifi</Label>
                      <div className="relative mt-2">
                        <ListboxButton
                          className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-black-2 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="block truncate">{validation.values.description || 'Tanlang'}</span>
          </span>
                          <ChevronUpDownIcon
                            aria-hidden="true"
                            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                          />
                        </ListboxButton>

                        <ListboxOptions
                          transition
                          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                        >
                          {
                            validation.values.description &&
                            <ListboxOption
                              value={''}
                              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                            >
                              <div className="flex items-center">
                                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                  Tanlang
                    </span>
                              </div>

                              <span
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                  <CheckIcon aria-hidden="true" className="size-5" />
              </span>
                            </ListboxOption>
                          }

                          {workExample.map((item: any) => (
                            <ListboxOption
                              key={item.id}
                              value={item.name}
                              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                            >
                              <div className="flex items-center">
                                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                  {item.name}
                    </span>
                              </div>

                              <span
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                  <CheckIcon aria-hidden="true" className="size-5" />
              </span>
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </div>
                    </Listbox>
                  </div>
                </div>
                <div className={'my-2 basic-1/2'}>
                  <label htmlFor="name" className="block text-md font-medium leading-6 text-gray-900">
                    Ish tavsifi
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="name"
                      rows={5}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.name || ''}
                      name="name"
                      placeholder="tavsif"
                      className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1 ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {validation.touched.name && validation.errors.name ? (
                    <h6 className="block text-md font-medium leading-6 text-red-900">
                      {validation.errors.name}
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
  )
    ;
};