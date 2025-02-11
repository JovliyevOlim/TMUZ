import { useEffect, useState } from 'react';
import userSix from '../../images/avatardefault_92824.webp';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { addNewEmployee, updateEmployee } from '../../slices/employee/thunk.ts';
import axios from 'axios';
import { baseUrl } from '../../helpers/api_helpers.ts';
import { getAllStation } from '../../slices/station/thunk.ts';
import Select from 'react-select';

export const AddUser = ({ modalOpen, setModalOpen, item, setItem }: any) => {
  const dispatch: any = useDispatch();
  const { isAction, isSuccess } = useSelector((state: any) => state.Employees);
  const { roles } = useSelector((state: any) => state.Role);
  const { enterprise } = useSelector((state: any) => state.EnterPrise);
  const { stations } = useSelector((state: any) => state.Station);
  const [image, setImage] = useState('');
  const [roleName, setRoleName] = useState('');
  const roleNames = ['SHNS', 'SHN', 'SHSM'];
  const isAddStation = roleNames.some((item) => item === roleName);
  const newStations: any = stations?.map(
    ({ name: label, id: value, ...rest }: { name: string; id: string }) => ({
      label,
      value,
      ...rest,
    }),
  );
  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    password: '',
    roleId: '',
    enterpriseId: '',
    jshshir: '',
    position: '',
    stationIdList: [],
  });

  // const isStation =

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    try {
      const responseImg: any = await axios.post(
        baseUrl + '/attachment/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setImage(responseImg.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  function tog_standard() {
    setModalOpen(!modalOpen);
    setInitialValues({
      firstName: '',
      lastName: '',
      password: '',
      roleId: '',
      enterpriseId: '',
      jshshir: '',
      position: '',
      stationIdList: [],
    });
    setImage('');
    validation.resetForm();
    setItem(null);
  }

  useEffect(() => {
    if (item) {
      setInitialValues({
        firstName: item?.firstName,
        lastName: item?.lastName,
        password: '',
        roleId: item?.roleId,
        enterpriseId: item?.enterpriseId,
        jshshir: item?.jshshir,
        position: item?.position,
        stationIdList: item?.stationIdList,
      });
      setImage(item?.attachmentId);
    } else {
      setInitialValues({
        firstName: '',
        lastName: '',
        password: '',
        roleId: '',
        enterpriseId: '',
        jshshir: '',
        position: '',
        stationIdList: [],
      });
      validation.resetForm();
    }
  }, [item]);

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: initialValues,
    validationSchema: Yup.object({
      firstName: Yup.string().required('Ismni kiriting !'),
      lastName: Yup.string().required('Familiyani kiriting !'),
      enterpriseId: Yup.string().required('Korxonani tanglang !'),
      jshshir: Yup.string().required('JSHSHIR ni kiriting !'),
      stationIdList: isAddStation
        ? Yup.array().min(1, 'Filial tanlang !').required('Filial tanlang !')
        : Yup.array(),
      roleId: Yup.string().required('Lavozimini tanlang'),
    }),
    onSubmit: (values) => {
      if (item) {
        dispatch(
          updateEmployee({ ...values, attachmentId: image, id: item.id }),
        );
      } else {
        dispatch(
          addNewEmployee({
            ...values,
            attachmentId: image,
          }),
        );
      }
    },
  });

  useEffect(() => {
    dispatch(getAllStation());
  }, [isAction]);

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      validation.resetForm();
      setItem(null);
      setInitialValues({
        firstName: '',
        lastName: '',
        password: '',
        roleId: '',
        enterpriseId: '',
        jshshir: '',
        position: '',
        stationIdList: [],
      });
      setImage('');
    }
  }, [dispatch, isAction]);

  return (
    <Dialog open={modalOpen} onClose={tog_standard} className="relative z-9999">
      <DialogBackdrop
        transition
        className="fixed inset-0  bg-black bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-150 sm:min-h-full items-center sm:items-end sm:w-full justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform w-full overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="divide-y divide-blue-200">
                <h5
                  className={
                    'text-title-md font-semibold text-black dark:text-white '
                  }
                >
                  Xodim yaratish
                </h5>
              </div>
              <div className={'sm:flex gap-3'}>
                <div className="z-30 mx-auto h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                  <div className="relative  drop-shadow-2">
                    <img
                      className={'rounded-full object-cover'}
                      width={320}
                      height={320}
                      src={
                        image
                          ? `${baseUrl}/attachment/download/${image}`
                          : userSix
                      }
                      alt="profile"
                    />
                    <label
                      htmlFor="profile"
                      className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                    >
                      <svg
                        className="fill-current"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                          fill=""
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                          fill=""
                        />
                      </svg>
                      <input
                        type="file"
                        name="profile"
                        id="profile"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className={'sm:flex  gap-3'}>
                  <div className={'my-2 sm:w-1/2'}>
                    <label
                      htmlFor="firstName"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      Ism
                    </label>
                    <div className="mt-2">
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.firstName || ''}
                        placeholder="Ism"
                        className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {validation.touched.firstName &&
                    validation.errors.firstName ? (
                      <h6 className="block text-md font-medium leading-6 text-red-900">
                        {validation.errors.firstName}
                      </h6>
                    ) : null}
                  </div>
                  <div className={'my-2 sm:w-1/2'}>
                    <label
                      htmlFor="lastName"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      Familiya
                    </label>
                    <div className="mt-2">
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.lastName || ''}
                        placeholder="Familiya"
                        className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {validation.touched.lastName &&
                    validation.errors.lastName ? (
                      <h6 className="block text-md font-medium leading-6 text-red-900">
                        {validation.errors.lastName}
                      </h6>
                    ) : null}
                  </div>
                </div>
                <div className={'sm:flex  gap-3'}>
                  <div className={'my-2 sm:w-1/2'}>
                    <label
                      htmlFor="roleId"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      Lavozim
                    </label>
                    <div className="mt-2">
                      <div className="relative inline-block w-full">
                        <select
                          id="roleId"
                          name="roleId"
                          onChange={(e) => {
                            let roleIdName = roles?.find(
                              (item: any) => e.target.value === item.id,
                            );
                            setRoleName(roleIdName?.name);
                            validation.handleChange(e);
                          }}
                          onBlur={validation.handleBlur}
                          value={validation.values.roleId || ''}
                          className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            className="text-body dark:text-bodydark"
                          >
                            Tanlang
                          </option>
                          {roles?.map((item: any) => (
                            <option
                              key={item.id}
                              value={item.id}
                              className="text-body dark:text-bodydark"
                            >
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {validation.touched.roleId && validation.errors.roleId ? (
                      <h6 className="block text-md font-medium leading-6 text-red-900">
                        {validation.errors.roleId}
                      </h6>
                    ) : null}
                  </div>
                  <div className={'my-2 sm:w-1/2'}>
                    <label
                      htmlFor="enterpriseId"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      Korxona
                    </label>
                    <div className="mt-2">
                      <div className="relative inline-block w-full">
                        <select
                          id="enterpriseId"
                          name="enterpriseId"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.enterpriseId || ''}
                          className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option
                            value=""
                            className="text-body dark:text-bodydark"
                          >
                            Tanlang
                          </option>
                          {enterprise?.map((item: any) => (
                            <option
                              value={item.id}
                              className="text-body dark:text-bodydark"
                            >
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {validation.touched.enterpriseId &&
                    validation.errors.enterpriseId ? (
                      <h6 className="block text-md font-medium leading-6 text-red-900">
                        {validation.errors.enterpriseId}
                      </h6>
                    ) : null}
                  </div>
                </div>
                <div className={'sm:flex  gap-3'}>
                  <div className={'my-2 w-full'}>
                    <label
                      htmlFor="stationIdList"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      Stansiya
                    </label>
                    <div className="mt-2">
                      <div className="relative inline-block w-full">
                        <Select
                          id="stationIdList"
                          placeholder={'Tanlash'}
                          name="stationIdList"
                          value={newStations?.filter((option: any) =>
                            validation.values.stationIdList.includes(
                              option.value,
                            ),
                          )}
                          isMulti={true}
                          onChange={(selectedOptions: any) =>
                            validation.setFieldValue(
                              'stationIdList',
                              selectedOptions
                                ? selectedOptions.map(
                                    (option: any) => option.value,
                                  )
                                : [],
                            )
                          }
                          options={newStations}
                          styles={{
                            menuList: (base) => ({
                              ...base,
                              maxHeight: '120px',
                            }),
                          }}
                        />
                      </div>
                    </div>
                    {validation.touched.stationIdList &&
                    validation.errors.stationIdList ? (
                      <h6 className="block text-md font-medium leading-6 text-red-900">
                        {validation.errors.stationIdList}
                      </h6>
                    ) : null}
                  </div>
                </div>
                <div className={'sm:flex  gap-3'}>
                  <div className={'my-2 sm:w-1/2'}>
                    <label
                      htmlFor="jshshir"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      JSHSHIR
                    </label>
                    <div className="mt-2">
                      <input
                        id="jshshir"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.jshshir || ''}
                        name="jshshir"
                        type="number"
                        placeholder="jshshir"
                        className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1 ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {validation.touched.jshshir && validation.errors.jshshir ? (
                      <h6 className="block text-md font-medium leading-6 text-red-900">
                        {validation.errors.jshshir}
                      </h6>
                    ) : null}
                  </div>
                  <div className={'my-2 sm:w-1/2'}>
                    <label
                      htmlFor="password"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      Parol
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.password || ''}
                        name="password"
                        type="number"
                        placeholder="password"
                        className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1 ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {validation.touched.password &&
                    validation.errors.password ? (
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
                    // disabled={loading}
                    type="submit"
                    className="flex justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-blue-800 hover:bg-blue-600 sm:mt-0 sm:w-auto"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
