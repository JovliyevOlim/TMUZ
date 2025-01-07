import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAction, getActionFilter } from '../../slices/action/thunk.ts';
import moment from 'moment/moment';
import { AddNewAction } from './AddNewAction.tsx';
import DeleteModal from '../../components/DeleteModal.tsx';
import { getAllPlot } from '../../slices/plot/thunk.ts';
import { getStationByPlotId } from '../../slices/station/thunk.ts';
import { getPeregonByPlotId } from '../../slices/peregon/thunk.ts';
import { getAllCategory } from '../../slices/category/thunk.ts';
import { getLevelCrossingByPlot } from '../../slices/levelCrossing/thunk.ts';

const Actions = () => {

  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const { actions, isAction } = useSelector((state: any) => state.Action);
  const { plot } = useSelector((state: any) => state.Plot);
  const { stations } = useSelector((state: any) => state.Station);
  const { peregons } = useSelector((state: any) => state.Peregon);
  const { levelCrossingForSelect } = useSelector((state: any) => state.LevelCrossing);
  const { categoryTrue } = useSelector((state: any) => state.Category);
  const { userId } = useSelector((state: any) => state.Login);
  const dispatch: any = useDispatch();

  const [plotId, setPlotId] = useState<string>('');
  const [stationId, setStationId] = useState<string>('');
  const [peregonId, setPeregonId] = useState<string>('');
  const [levelCrossingId, setLevelCrossingId] = useState<string>('');
  const [deviceCategoryId, setDeviceCategoryId] = useState<string>('');
  const onClickEdit = (data: any) => {
    setModal(true);
    setEditData(data);
  };

  const onClickDelete = (data: any) => {
    setModalDelete(true);
    setEditData(data);
  };

  const deleteFunction = () => {
    dispatch(deleteAction(editData?.id));
    setModalDelete(false);
    setEditData(null);
  };

  useEffect(() => {
    dispatch(getAllPlot());
  }, []);


  const filterByPlot = (id) => {
    dispatch(getStationByPlotId(id));
    dispatch(getLevelCrossingByPlot(id));
    dispatch(getPeregonByPlotId(id));
  };

  useEffect(() => {
    if (stationId) {
      dispatch(getAllCategory(
        {
          isStation: true,
          isLevelCrossing: false,
          isPeregon: false
        }
      ));
    }
    if (levelCrossingId) {
      dispatch(getAllCategory(
        {
          isStation: false,
          isLevelCrossing: true,
          isPeregon: false
        }
      ));
    }
    if (peregonId) {
      dispatch(getAllCategory(
        {
          isStation: false,
          isLevelCrossing: false,
          isPeregon: true
        }
      ));
    }
  }, [peregonId, levelCrossingId, stationId]);


  useEffect(() => {
    if (deviceCategoryId) {
      dispatch(getActionFilter(deviceCategoryId));
    }
  }, [isAction, deviceCategoryId]);


  return (
    <>
      <Breadcrumb pageName="Qurilmalar harakati" />
      <div className={'flex justify-end my-3'}>
      </div>
      <div
        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className={'flex items-center gap-2 justify-between my-3'}>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Qurilmalar
          </h4>

        </div>

        <div className={'md:flex gap-4'}>
          <div className={'my-2 md:w-1/2'}>
            <label htmlFor="status" className="block text-md font-medium leading-6 text-gray-900">
              Uchastka
            </label>
            <div className="mt-2">
              <div className="relative inline-block w-full">
                <select
                  id="plotId"
                  name="plotId"
                  value={plotId}
                  onChange={(e) => {
                    setPlotId(e.target.value);
                    filterByPlot(e.target.value);
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                  ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value={''} className="text-body dark:text-bodydark">
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
          </div>
          <div className={'my-2 md:w-1/2'}>
            <label htmlFor="status" className="block text-md font-medium leading-6 text-gray-900">
              Stansiya
            </label>
            <div className="mt-2">
              <div className="relative inline-block w-full">
                <select
                  id="stationId"
                  name="stationId"
                  value={stations}
                  onChange={(e) => {
                    setStationId(e.target.value);
                    setLevelCrossingId('');
                    setPeregonId('');
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value={''} className="text-body dark:text-bodydark">
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
          </div>
          <div className={'my-2 md:w-1/2'}>
            <label htmlFor="status" className="block text-md font-medium leading-6 text-gray-900">
              Kesishma
            </label>
            <div className="mt-2">
              <div className="relative inline-block w-full">
                <select
                  id="levelCrossingId"
                  name="levelCrossingId"
                  value={levelCrossingId}
                  onChange={(e) => {
                    setLevelCrossingId(e.target.value);
                    setStationId('');
                    setPeregonId('');
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value={''} className="text-body dark:text-bodydark">
                    Tanlang
                  </option>
                  {
                    levelCrossingForSelect.map((item: any) =>
                      <option value={item.id} className="text-body dark:text-bodydark">
                        {item.name}
                      </option>
                    )
                  }

                </select>
              </div>

            </div>
          </div>
          <div className={'my-2 md:w-1/2'}>
            <label htmlFor="status" className="block text-md font-medium leading-6 text-gray-900">
              Peregon
            </label>
            <div className="mt-2">
              <div className="relative inline-block w-full">
                <select
                  id="peregonId"
                  name="peregonId"
                  value={peregonId}
                  onChange={(e) => {
                    setPeregonId(e.target.value);
                    setStationId('');
                    setLevelCrossingId('');
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value={''} className="text-body dark:text-bodydark">
                    Tanlang
                  </option>
                  {
                    peregons.map((item: any) =>
                      <option value={item.id} className="text-body dark:text-bodydark">
                        {item.name}
                      </option>
                    )
                  }

                </select>
              </div>
            </div>
          </div>
          <div className={'my-2 md:w-1/2'}>
            <label htmlFor="status" className="block text-md font-medium leading-6 text-gray-900">
              Qurilma turlari
            </label>
            <div className="mt-2">
              <div className="relative inline-block w-full">
                <select
                  id="deviceCategoryId"
                  name="deviceCategoryId"
                  value={deviceCategoryId}
                  onChange={(e) => {
                    setDeviceCategoryId(e.target.value);
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value={''} className="text-body dark:text-bodydark">
                    Tanlang
                  </option>
                  {
                    categoryTrue.map((item: any) =>
                      <option value={item.id} className="text-body dark:text-bodydark">
                        {item.name}
                      </option>
                    )
                  }

                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <table className="min-w-230 sm:min-w-full table-fixed">
              <thead>
              <tr className="text-start text-sm font-medium uppercase xsm:text-base">
                <th className="p-2.5 text-start">Nomi</th>
                <th className="p-2.5 text-start">Boshlangan</th>
                <th className="p-2.5 text-start">Tugagan</th>
                <th className="p-2.5 text-start">Tavsif</th>
                <th className="p-2.5 ext-start">Action</th>
              </tr>
              </thead>
              <tbody>
              {actions?.map((item: any, key: number) => (
                <tr key={key}>
                  <td>
                    <p className="p-2.5  text-black dark:text-white sm:block">
                      {item.deviceName}
                    </p>
                  </td>
                  <td>
                    <p className="p-2.5 text-black dark:text-white">{moment(item.createdAt).format('LLL')}</p>
                  </td>
                  <td>
                    <p
                      className="p-2.5 text-black dark:text-white">{item.done ? moment(item.createdAt).format('LLL') : 'Tugallanmagan'}</p>
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
      </div>
      <AddNewAction modalOpen={modal} setModalOpen={setModal} item={editData} setItem={setEditData} />;
      <DeleteModal modalOpen={modalDelete} setModalOpen={setModalDelete} text={'Action'} setItem={setEditData}
                   deleteFunction={deleteFunction} />;
    </>
  )
    ;
};

export default Actions;
