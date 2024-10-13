import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddPlot } from './AddPlot.tsx';
import { getAllEnterprise } from '../../slices/enterprise/thunk.ts';
import { deletePlot, getAllPlot } from '../../slices/plot/thunk.ts';
import DeleteModal from '../../components/DeleteModal.tsx';

const Plot = () => {

  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const { plot, isAction } = useSelector((state: any) => state.Plot);
  const dispatch: any = useDispatch();

  const onClickEdit = (data: any) => {
    setModal(true);
    setEditData(data);
  };
  const onClickDelete = (data: any) => {
    setModalDelete(true);
    setEditData(data);
  };

  const deleteFunction = () => {
    dispatch(deletePlot(editData?.id));
    setModalDelete(false);
  };
  useEffect(() => {
    dispatch(getAllPlot());
    dispatch(getAllEnterprise());
  }, [isAction]);

  return (
    <>
      <Breadcrumb pageName="Uchastka" />
      <div className={'flex justify-end my-3'}>
        <button
          onClick={() => setModal(true)}
          className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Uchastka yaratish +
        </button>

      </div>
      <div
        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Uchastka
        </h4>
        <div className="flex flex-col">
          <table className="table-fixed">
            <thead>
            <tr className="text-start text-sm font-medium uppercase xsm:text-base">
              <th className="p-2.5 text-start">Nomi</th>
              <th className="p-2.5 text-start">Tavsif</th>
              <th className="p-2.5 ext-start">Action</th>
            </tr>
            </thead>
            <tbody>
            {plot?.map((item: any, key: number) => (
              <tr key={key}>
                <td>
                  <p className="p-2.5  text-black dark:text-white sm:block">
                    {item.name}
                  </p>
                </td>
                <td>
                  <p className="p-2.5 text-black dark:text-white">{item.description}</p>
                </td>
                <td>
                  <div className="flex items-center justify-center p-2.5  gap-2 xl:p-5">
                    <button onClick={() => onClickEdit(item)}
                            className="flex items-center gap-2 justify-center rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                           stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                      Edit
                    </button>
                    <button onClick={() => onClickDelete(item)}
                            className="flex items-center gap-2 justify-center rounded-md bg-red-600
                            px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500
                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                           stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddPlot modalOpen={modal} setModalOpen={setModal} item={editData} setItem={setEditData} />
      <DeleteModal modalOpen={modalDelete} setModalOpen={setModalDelete} text={'Uchastka'} setItem={setEditData}
                   deleteFunction={deleteFunction} />
    </>
  );
};

export default Plot;
