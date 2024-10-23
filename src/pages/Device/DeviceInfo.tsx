import { useEffect, useState } from 'react';
// import { AddWorks } from './AddWorks.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDeviceInfoForQr } from '../../slices/device/thunk.ts';
import moment from 'moment';
import { Button } from 'reactstrap';
import { AddNewAction } from './AddNewAction.tsx';
import { checkDeviceForAction } from '../../slices/action/thunk.ts';

const DeviceInfo = () => {

  const { deviceQrCodeInfo } = useSelector((state: any) => state.Device);
  const { checkUser, isAction } = useSelector((state: any) => state.Action);
  const dispatch: any = useDispatch();
  const { id }: any = useParams();
  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },

        (error) => {
          console.error('Error get user location: ', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser');
    }
  };

  useEffect(() => {
    console.log('check use', checkUser);
    if (checkUser) {
      setModal(true);
    } else {
      setModal(false);
    }
  }, [checkUser]);

  useEffect(() => {
    if (userLocation){
        dispatch(checkDeviceForAction({
          lon: userLocation?.longitude,
          lat: userLocation?.latitude,
          // latitude: 41.3106176,
          // longitude: 69.3141504,
          deviceId: id
        }));
    }
  }, [userLocation]);



  console.log(userLocation);

  useEffect(() => {
    dispatch(getDeviceInfoForQr(id));
  }, [isAction]);


  return (
    <>
      <div className={'flex justify-end my-3'}>
      </div>
      <div
        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Qurilma ma'lumotlari
        </h4>

        <div className="flex flex-col">
          <div className="p-2.5 text-start xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              <strong>Nomi:</strong> {deviceQrCodeInfo?.deviceDto?.name}
            </h5>
          </div>
          <div className="p-2.5 text-start xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              <strong>Tavsif:</strong> {deviceQrCodeInfo?.deviceDto?.description}
            </h5>
          </div>
          <div className="p-2.5 text-start xl:p-5">
            {
              deviceQrCodeInfo?.deviceDto?.stationName ?
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  <strong>Stansiya:</strong> {deviceQrCodeInfo?.deviceDto?.stationName}
                </h5> : <h5 className="text-sm font-medium uppercase xsm:text-base">
                  <strong>Kesishma:</strong> {deviceQrCodeInfo?.deviceDto?.levelCrossingName}
                </h5>
            }

          </div>
          <Button
            onClick={getUserLocation}
            className="inline-flex items-center justify-center gap-2.5 border border-primary py-2 px-5 text-center font-semibold text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Yangi ish qilish
          </Button>
          <AddNewAction modalOpen={modal} setModalOpen={setModal} item={editData} setItem={setEditData} />
        </div>
      </div>
      <div
        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Oxirgi harakat
        </h4>

        {
          deviceQrCodeInfo?.actionGetDto?.userId ?
            <div className="flex flex-col">
              <div className="p-2.5 text-start xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  <strong>Xodim:</strong> {deviceQrCodeInfo?.actionGetDto?.userLastName} {deviceQrCodeInfo?.actionGetDto?.userFirstName}
                </h5>
              </div>
              <div className="p-2.5 text-start xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  <strong>Qilingan vaqti:</strong> {moment(deviceQrCodeInfo?.actionGetDto?.doneTime).format('LLLL')}
                </h5>
              </div>
              <div className="p-2.5 text-start xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  <strong>Tavsif:</strong> {deviceQrCodeInfo?.actionGetDto?.description}
                </h5>
              </div>
            </div>
            : <div className="p-2.5 text-start xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Harakat yo'q
              </h5>
            </div>
        }
      </div>
    </>
  );
};

export default DeviceInfo;
