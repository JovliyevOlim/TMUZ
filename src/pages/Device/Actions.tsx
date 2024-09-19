import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useEffect, useState } from 'react';
// import { AddWorks } from './AddWorks.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { getActionByUserDone, getActionByUserDoneFalse } from '../../slices/action/thunk.ts';
import moment from 'moment/moment';
import { AddNewAction } from './AddNewAction.tsx';

const Actions = () => {

  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const { actions, isAction } = useSelector((state: any) => state.Action);
  const { userId } = useSelector((state: any) => state.Login);
  const dispatch: any = useDispatch();
  const [userIsDone, setUserIsDone] = useState('true');
  const onClickEdit = (data: any) => {
    setModal(true);
    setEditData(data);
  };

  useEffect(() => {
    if (userIsDone === 'true') {
      dispatch(getActionByUserDone(userId));
    } else {
      dispatch(getActionByUserDoneFalse(userId));
    }
  }, [isAction, userIsDone]);
  return (
    <>
      <Breadcrumb pageName="Qurilmalar harakati" />
      <div className={'flex justify-end my-3'}>
      </div>
      <div
        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className={'flex items-center justify-between my-3'}>
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Qurilmalar
          </h4>
          <div className="">
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                name="userIsDone"
                onChange={(e) => setUserIsDone(e.target.value)}
                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
              >
                <option value="true" className="text-body dark:text-bodydark">
                  Bajarilgan
                </option>
                <option value="false" className="text-body dark:text-bodydark">
                  Bajarilmagan
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


        <div className="flex flex-col">
          <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4">
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Nomi
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Boshlangan
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Tugagan
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

          {actions?.map((item: any, key: number) => (
            <div
              className={`grid grid-cols-5 ${
                key === actions?.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0">
                </div>
                <p className="text-black dark:text-white sm:block">
                  {item.deviceName}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{moment(item.createdAt).format('LLL')}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p
                  className="text-black dark:text-white">{item.done ? moment(item.createdAt).format('LLL') : 'Tugallanmagan'}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{item.description}</p>
              </div>
              <div className="flex items-center justify-center p-2.5  gap-2 xl:p-5">
                <Button
                  onClick={() => onClickEdit(item)}
                  className="inline-flex items-center justify-center gap-2.5 border border-primary py-2 px-5 text-center font-semibold text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Edit
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
      <AddNewAction modalOpen={modal} setModalOpen={setModal} item={editData} setItem={setEditData} />
    </>
  );
};

export default Actions;
