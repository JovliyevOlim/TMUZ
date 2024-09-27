import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useEffect, useState } from 'react';
import { AddUser } from './AddUsers.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../../slices/user/thunk.ts';
import { Button } from 'reactstrap';


const Users = () => {

  const dispatch: any = useDispatch();
  const { users, isAction } = useSelector((state: any) => state.User);
  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const onClickEdit = (data: any) => {
    setModal(true);
    setEditData(data);
  };

  useEffect(() => {
    dispatch(getAllUser());
  }, [isAction]);

  return (
    <>
      <Breadcrumb pageName="Xodimlar" />
      <div className={'flex justify-end my-3'}>
        <button
          onClick={() => setModal(true)}
          className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Xodim qo'shish (JSHSHIR orqali)
        </button>

      </div>
      <div
        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Xodimlar
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
            {/*<div className="p-2.5 xl:p-5">*/}
            {/*  <h5 className="text-sm font-medium uppercase xsm:text-base">*/}
            {/*    Source*/}
            {/*  </h5>*/}
            {/*</div>*/}
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                F.I.O
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Username
              </h5>
            </div>
            {/*<div className="hidden p-2.5 text-center sm:block xl:p-5">*/}
            {/*  <h5 className="text-sm font-medium uppercase xsm:text-base">*/}
            {/*    Sales*/}
            {/*  </h5>*/}
            {/*</div>*/}
            {/*<div className="hidden p-2.5 text-center sm:block xl:p-5">*/}
            {/*  <h5 className="text-sm font-medium uppercase xsm:text-base">*/}
            {/*    Conversion*/}
            {/*  </h5>*/}
            {/*</div>*/}
          </div>

          {users?.map((item: any, key: number) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-3 ${
                key === users.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={key}
            >
              {/*<div className="flex items-center gap-3 p-2.5 xl:p-5">*/}
              {/*  <div className="flex-shrink-0">*/}
              {/*    <img src={item.logo} alt="Brand" />*/}
              {/*  </div>*/}
              {/*  <p className="hidden text-black dark:text-white sm:block">*/}
              {/*    {item.name}*/}
              {/*  </p>*/}
              {/*</div>*/}

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{item.firstName} {item.lastName}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{item.username}</p>
              </div>

              <div className="flex items-center justify-center p-2.5  gap-2 xl:p-5">
                <Button
                  onClick={() => onClickEdit(item)}
                  className="inline-flex items-center justify-center gap-2.5 border border-primary py-2 px-5 text-center font-semibold text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Edit
                </Button>
                <Button
                  // onClick={() => dispatch((item?.id))}
                  className="inline-flex items-center justify-center gap-2.5 border border-danger py-2 px-5 text-center font-semibold text-danger hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Delete
                </Button>
              </div>

              {/*<div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">*/}
              {/*  <p className="text-meta-5">{item.conversion}%</p>*/}
              {/*</div>*/}
            </div>
          ))}
        </div>
      </div>
      <AddUser modalOpen={modal} setModalOpen={setModal} item={editData} setItem={setEditData} />
    </>
  );
};

export default Users;
