import { BRAND } from '../../types/brand.ts';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useEffect, useState } from 'react';
import { AddWorks } from './AddWorks.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { deleteJob, getJobs } from '../../slices/work/thunk.ts';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const brandData: BRAND[] = [
  {
    logo: BrandOne,
    name: 'Google',
    visitors: 3.5,
    revenues: '5,768',
    sales: 590,
    conversion: 4.8
  },
  {
    logo: BrandTwo,
    name: 'Twitter',
    visitors: 2.2,
    revenues: '4,635',
    sales: 467,
    conversion: 4.3
  },
  {
    logo: BrandThree,
    name: 'Github',
    visitors: 2.1,
    revenues: '4,290',
    sales: 420,
    conversion: 3.7
  },
  {
    logo: BrandFour,
    name: 'Vimeo',
    visitors: 1.5,
    revenues: '3,580',
    sales: 389,
    conversion: 2.5
  },
  {
    logo: BrandFive,
    name: 'Facebook',
    visitors: 3.5,
    revenues: '6,768',
    sales: 390,
    conversion: 4.2
  }
];

const Works = () => {

  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const { jobs, isAction } = useSelector((state: any) => state.Work);
  const dispatch: any = useDispatch();

  const onClickEdit = (data: any) => {
    setModal(true);
    setEditData(data);
  };

  useEffect(() => {
    dispatch(getJobs());
  }, [isAction]);

  return (
    <>
      <Breadcrumb pageName="Ish" />
      <div className={'flex justify-end my-3'}>
        <button
          onClick={() => setModal(true)}
          className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Rejaviy kundalik ish yaratish +
        </button>

      </div>
      <div
        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Rejaviy kundalik ishlar
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4">
            <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Ish
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Description
              </h5>
            </div>
            <div className="p-2.5 text-center  xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div>

          {jobs?.map((item, key) => (
            <div
              className={`grid grid-cols-3 ${
                key === brandData.length - 1
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
                <p className="text-black dark:text-white">{item.description}</p>
              </div>
              <div className="flex items-center justify-center p-2.5  gap-2 xl:p-5">
                <Button
                  onClick={() => onClickEdit(item)}
                  className="inline-flex items-center justify-center gap-2.5 border border-primary py-2 px-5 text-center font-semibold text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => dispatch(deleteJob(item?.id))}
                  className="inline-flex items-center justify-center gap-2.5 border border-danger py-2 px-5 text-center font-semibold text-danger hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddWorks modalOpen={modal} setModalOpen={setModal} item={editData} setItem={setEditData} />
    </>
  );
};

export default Works;
