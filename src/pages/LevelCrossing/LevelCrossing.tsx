import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useEffect, useState } from 'react';
// import { AddWorks } from './AddWorks.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { AddLevelCrossing } from './AddLevelCrossing.tsx';
import { getAllPlot } from '../../slices/plot/thunk.ts';
import { getAllLevelCrossing } from '../../slices/levelCrossing/thunk.ts';

const LevelCrossing = () => {

  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const { levelCrossing, isAction } = useSelector((state: any) => state.LevelCrossing);
  const dispatch: any = useDispatch();

  const onClickEdit = (data: any) => {
    setModal(true);
    setEditData(data);
  };
  // const onClickQrCode = (data: any) => {
  //   setQrCodeModal(true);
  //   setEditData(data);
  // };

  useEffect(() => {
    dispatch(getAllLevelCrossing());
    dispatch(getAllPlot());
  }, [isAction]);
  return (
    <>
      <Breadcrumb pageName="Temiryo'l kesishmasi" />
      <div className={'flex justify-end my-3'}>
        <button
          onClick={() => setModal(true)}
          className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Temiryo'l kesishmasi
        </button>

      </div>
      <div
        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Temiryo' kesishmasi
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4">
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Nomi
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Uchastka
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

          {levelCrossing?.map((item: any, key: number) => (
            <div
              className={`grid grid-cols-4 ${
                key === levelCrossing?.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0">
                </div>
                <p className="text-black dark:text-white sm:block">
                  {item.name}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{item.address}</p>
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
                {/*  onClick={() => onClickQrCode(item)}*/}
                {/*  className="inline-flex items-center justify-center gap-2.5 border border-success py-2 px-5 text-center font-semibold text-success hover:bg-opacity-90 lg:px-8 xl:px-10"*/}
                {/*>*/}
                {/*  QrCode*/}
                {/*</Button>*/}
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
      <AddLevelCrossing modalOpen={modal} setModalOpen={setModal} item={editData} setItem={setEditData} />
    </>
  );
};

export default LevelCrossing;
