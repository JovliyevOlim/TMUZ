import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import React, { useEffect, useState } from 'react';
import { AddWorks } from './AddWorks.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { doneJob, getJobs } from '../../slices/work/thunk.ts';
import { getAllStation } from '../../slices/station/thunk.ts';


const Works = () => {

  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const { jobs, isAction } = useSelector((state: any) => state.Work);
  const { userId } = useSelector((state: any) => state.Login);
  const { stations } = useSelector((state: any) => state.Station);
  const dispatch: any = useDispatch();
  const [isYear, setIsYear] = useState('daily');
  const [stationId, setStationId] = useState(stations[0]?.id);
  const [status, setStatus] = useState('all');
  const onClickDone = (data: any) => {
    dispatch(doneJob({
      id: data,
      done: true,
      userId
    }));
  };

  const daily: boolean = isYear === 'daily';

  useEffect(() => {
    dispatch(getJobs({
      stationId: stationId,
      params: {
        daily: daily,
        status: status
      }
    }));
  }, [isAction, daily, status, stationId]);

  useEffect(() => {
    dispatch(getAllStation());
  }, []);

  return (
    <>
      <Breadcrumb pageName="Ish" />
      <div>
        <div className={'my-2 w-1/2'}>
          <div className="mt-2">
            <div className="relative inline-block w-full">
              <select
                id="stationId"
                name="stationId"
                onChange={(e) => setIsYear(e.target.value)}
                value={isYear}
                className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option value="daily" className="text-body dark:text-bodydark">Rejaviy kundalik ishlar</option>
                <option value="year" className="text-body dark:text-bodydark">Rejaviy yillik ishlar</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className={'flex justify-end my-3'}>
        <button
          onClick={() => setModal(true)}
          className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Rejaviy {daily ? 'kundalik' : 'yillik'} ishlar +
        </button>

      </div>
      <div
        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Rejaviy {daily ? 'kundalik' : 'yillik'} ishlar
        </h4>

        <div className={'flex gap-4'}>
          <div className={'my-2 w-1/2'}>
            <label htmlFor="stationId" className="block text-md font-medium leading-6 text-gray-900">
              Ish statusi
            </label>
            <div className="mt-2">
              <div className="relative inline-block w-full">
                <select
                  id="stationId"
                  name="stationId"
                  onChange={(e) => setStationId(e.target.value)}
                  value={stationId}
                  className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value={'all'} className="text-body dark:text-bodydark">Barchasi</option>
                  <option value={'rejected'} className="text-body dark:text-bodydark">Rad etilgan</option>
                  <option value={'done'} className="text-body dark:text-bodydark">Bajarilgan</option>
                  <option value={'paused'} className="text-body dark:text-bodydark">Ko'chirilgan</option>
                </select>
              </div>
            </div>
          </div>
          <div className={'my-2 w-1/2'}>
            <label htmlFor="stationId" className="block text-md font-medium leading-6 text-gray-900">
              Stansiya
            </label>
            <div className="mt-2">
              <div className="relative inline-block w-full">
                <select
                  id="stationId"
                  name="stationId"
                  onChange={(e) => setStationId(e.target.value)}
                  value={stationId}
                  className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  {
                    stations.map((item: any) =>
                      <option value={item.id} className="text-body dark:text-bodydark">{item.name}</option>
                    )
                  }
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <table className="min-w-171.5 sm:min-w-full table-fixed">
              <thead>
              <tr className="text-start text-sm font-medium uppercase xsm:text-base">
                <th className="p-2.5 text-start">Ish</th>
                {/*<th className="p-2.5 text-start">Tavsif</th>*/}
                <th className="p-2.5 ext-start">Action</th>
              </tr>
              </thead>
              <tbody>
              {jobs?.map((item: any, key: number) => (
                <tr key={key}>
                  <td>
                    <p className="p-2.5  text-black dark:text-white sm:block">
                      {item.name}
                    </p>
                  </td>
                  <td>
                    <p className="p-2.5 text-black dark:text-white">{item.address}</p>
                  </td>
                  {/*<td>*/}
                  {/*  <p className="p-2.5 text-black dark:text-white">{item.description}</p>*/}
                  {/*</td>*/}
                  <td>
                    <div className="flex items-center justify-center p-2.5  gap-2 xl:p-5">
                      <button onClick={() => onClickDone(item.id)}
                              className="flex items-center gap-2 justify-center rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Bajarildi
                      </button>
                      <button
                        className="flex items-center gap-2 justify-center rounded-md bg-red-600
                            px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500
                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                        Ko'chirish
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
      <AddWorks modalOpen={modal} setModalOpen={setModal} item={editData} setItem={setEditData} daily={daily} />
    </>
  );
};

export default Works;
