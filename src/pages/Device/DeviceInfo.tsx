import { useEffect, useState } from 'react';
// import { AddWorks } from './AddWorks.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Button } from 'reactstrap';
import { AddNewAction } from './AddNewAction.tsx';
import { toast } from 'react-toastify';
import { Login } from '../Authentication/Login.tsx';
import { getDeviceInfoForQr } from '../../slices/device/thunk.ts';
import { checkDeviceForAction } from '../../slices/action/thunk.ts';

const DeviceInfo = () => {

  const { deviceQrCodeInfo } = useSelector((state: any) => state.Device);
  const { checkUser, isAction } = useSelector((state: any) => state.Action);
  const { user } = useSelector((state: any) => state.Login);

  const dispatch: any = useDispatch();
  const { id }: any = useParams();
  const [modal, setModal] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [checkIsUser, setCheckIsUser] = useState(false);
  const [editData, setEditData] = useState(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);


  useEffect(() => {
    // Sana saqlash
    const savedDate = localStorage.getItem('savedDate');
    if (!savedDate) {
      // Agar sana saqlanmagan bo'lsa, hozirgi sanani saqlaymiz
      const today = new Date();
      localStorage.setItem('savedDate', today.toISOString());
      localStorage.removeItem('authUser');
      setCheckIsUser(false);
    } else {
      // Sana o'qiladi va kunlar farqi hisoblanadi
      const today = new Date();
      const storedDate = new Date(savedDate);

      const differenceInTime = today - storedDate;
      const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));


      if (differenceInDays <= 10) {
        setCheckIsUser(true);
      } else {
        setCheckIsUser(false);
      }
    }
  }, []);

  useEffect(() => {
    const storage = localStorage.getItem('authUser');
    if (storage) {
      setCheckIsUser(true);
    } else {
      setCheckIsUser(false);
    }
  }, [modalLogin, localStorage.getItem('authUser'), user, isWithin10Days]);


  useEffect(() => {
    getUserLocation();
    // setUserLocation({
    //   latitude: 41.306018,
    //   longitude: 69.279271
    // });
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },

        (error) => {
          toast.error(error);
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser');
    }
  };


  useEffect(() => {
    if (userLocation && (checkIsUser || user)) {
      dispatch(checkDeviceForAction({
        longitude: userLocation?.longitude,
        latitude: userLocation?.latitude,
        deviceId: id
      }));
    }
  }, [userLocation, checkIsUser, user]);


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
            {
              deviceQrCodeInfo?.deviceDto?.stationName ?
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  <strong>Stansiya:</strong> {deviceQrCodeInfo?.deviceDto?.stationName}
                </h5> : <h5 className="text-sm font-medium uppercase xsm:text-base">
                  <strong>Kesishma:</strong> {deviceQrCodeInfo?.deviceDto?.levelCrossingName}
                </h5>
            }

          </div>
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

          {
            checkUser ? <>
              {
                checkIsUser ? <Button
                    onClick={() => setModal(true)}
                    className="inline-flex items-center justify-center gap-2.5 border border-primary py-2 px-5 text-center font-semibold text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                  >
                    Yangi ish qilish
                  </Button>
                  : <Button
                    onClick={() => setModalLogin(true)}
                    className="inline-flex items-center justify-center gap-2.5 border border-primary py-2 px-5 text-center font-semibold text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                  >
                    Kirish
                  </Button>
              }
            </> : <Button
              onClick={getUserLocation}
              className="inline-flex items-center justify-center gap-2.5 border border-primary py-2 px-5 text-center font-semibold text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Lokatsiyani tekshirish
            </Button>
          }

          <AddNewAction modalOpen={modal} setModalOpen={setModal} item={editData} setItem={setEditData} />
          <Login modalOpen={modalLogin} setModalOpen={setModalLogin} />
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
