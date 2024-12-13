import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useEffect, useState } from 'react';
import { AddWorks } from './AddWorks.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { confirmJob, doneJob, getJobs } from '../../slices/work/thunk.ts';
import { getAllStation, getStationByPlotId } from '../../slices/station/thunk.ts';
import { PauseWork } from './PauseWork.tsx';
import { RejectedWork } from './RejectedWork.tsx';
import moment from 'moment';
import { getAllPlot } from '../../slices/plot/thunk.ts';


const Works = () => {

  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const { jobs, isAction } = useSelector((state: any) => state.Work);
  const { userId, userPermissions } = useSelector((state: any) => state.Login);
  const { stations } = useSelector((state: any) => state.Station);
  const { plot } = useSelector((state: any) => state.Plot);
  const dispatch: any = useDispatch();
  const [isYear, setIsYear] = useState('daily');
  const [stationId, setStationId] = useState(stations[0]?.id);
  const [plotId, setPlotId] = useState('');
  const [status, setStatus] = useState('all');
  const [pausedJob, setPausedJob] = useState(false);
  const [rejectedJob, setRejectedJob] = useState(false);
  const onClickDone = (data: any) => {
    dispatch(doneJob({
      id: data,
      done: true,
      userId
    }));
  };

  const onClickConfirmed = (data: any) => {
    dispatch(confirmJob({
      id: data,
      confirm: true,
      userId
    }));
  };

  const onClickRejected = (data: any) => {
    setEditData(data);
    setRejectedJob(true);
  };
  const onClickPause = (data: any) => {
    setEditData(data);
    setPausedJob(true);
  };

  const daily: boolean = isYear === 'daily';

  useEffect(() => {
    if (stationId) {
      dispatch(getJobs({
        stationId: stationId,
        params: {
          daily: daily,
          status: status
        }
      }));
    }
  }, [isAction, daily, status, stationId]);

  useEffect(() => {
    if (plotId) {
      dispatch(getStationByPlotId(plotId));
    }
  }, [plotId]);

  useEffect(() => {
    dispatch(getAllPlot());
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
        {
          userPermissions?.includes('ADD_JOB')
          && <button
            onClick={() => setModal(true)}
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Rejaviy {daily ? 'kundalik' : 'yillik'} ishlar +
          </button>
        }


      </div>
      <div
        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Rejaviy {daily ? 'kundalik' : 'yillik'} ishlar
        </h4>

        <div className={'flex gap-4'}>
          <div className={'my-2 w-1/2'}>
            <label htmlFor="status" className="block text-md font-medium leading-6 text-gray-900">
              Ish statusi
            </label>
            <div className="mt-2">
              <div className="relative inline-block w-full">
                <select
                  id="status"
                  name="status"
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
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
            <label htmlFor="plotId" className="block text-md font-medium leading-6 text-gray-900">
              Stansiya
            </label>
            <div className="mt-2">
              <div className="relative inline-block w-full">
                <select
                  id="plotId"
                  name="plotId"
                  onChange={(e) => setPlotId(e.target.value)}
                  value={plotId}
                  className="block w-full rounded-md border-0 py-1.5 text-black-2 shadow-sm ring-1
                      ring-zinc-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  {
                    plot.map((item: any) =>
                      <option value={item.id} className="text-body dark:text-bodydark">{item.name}</option>
                    )
                  }
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
                  <option value={''} className="text-body dark:text-bodydark">Tanlang</option>
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
                <th className="p-2.5 text-start">Ish yaratgan xodim</th>
                <th className="p-2.5 text-start">Stansiya</th>
                <th className="p-2.5 text-start">Yaratilgan sana</th>
                <th className="p-2.5 text-start">Tavsif</th>
                <th className="p-2.5 ext-start">Action</th>
              </tr>
              </thead>
              <tbody>
              {jobs?.map((item: any, key: number) => (
                <tr key={key}>
                  <td>
                    <p className="p-2.5  text-black dark:text-white sm:block">
                      {item.createdBy}
                    </p>
                  </td>
                  <td>
                    <p className="p-2.5 text-black dark:text-white">{item.station}</p>
                  </td>
                  <td>
                    <p className="p-2.5 text-black dark:text-white">{moment(item.startTime).format('L')}</p>
                  </td>
                  <td>
                    <p className="p-2.5 text-black dark:text-white">{item.description}</p>
                  </td>

                  <td>
                    <div className="flex items-center flex-wrap justify-center p-2.5  gap-2 xl:p-5">
                      {
                        !item.done && <>
                          {
                            userPermissions?.includes('DONE_JOB')
                            &&
                            <button onClick={() => onClickDone(item.id)}
                                    className="flex items-center gap-2 justify-center rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                              Bajarildi
                            </button>
                          }
                          {
                            userPermissions?.includes('PAUSE_JOB')
                            && <button
                              onClick={() => onClickPause(item)}
                              className="flex items-center gap-2 justify-center rounded-md bg-red-600
                            px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500
                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                              Ko'chirish
                            </button>

                          }
                        </>
                      }


                      {
                        userPermissions?.includes('CONFIRM_JOB')
                        && <button onClick={() => onClickConfirmed(item.id)}
                                   className="flex items-center gap-2 justify-center rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                          Tasdiqlash
                        </button>
                      }
                      {
                        userPermissions?.includes('CONFIRM_JOB')
                        &&
                        <button onClick={() => onClickRejected(item)}
                                className="flex items-center gap-2 justify-center rounded-md bg-red-600
                            px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500
                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                          Rad etish
                        </button>
                      }

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
      <PauseWork modalOpen={pausedJob} setModalOpen={setPausedJob} item={editData} setItem={setEditData} />
      <RejectedWork modalOpen={rejectedJob} setModalOpen={setRejectedJob} item={editData} setItem={setEditData} />
    </>
  );
};

export default Works;
