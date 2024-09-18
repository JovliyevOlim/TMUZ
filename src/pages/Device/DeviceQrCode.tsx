import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'react-qr-code';
import { localUrl } from '../../helpers/api_helpers.ts';


export const DeviceQrCode = ({ modalOpen, setModalOpen, item, setItem }: any) => {
  const dispatch: any = useDispatch();
  const { loading, isAction, isSuccess } = useSelector((state: any) => state.Device);

  function tog_standard() {
    setModalOpen(!modalOpen);
  }


  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      setItem(null);
    }
  }, [dispatch, isAction]);
  console.log(localUrl + '/deviceInfo/' + item?.id);
  return (
    modalOpen &&
    <div
      className="modal-container fixed z-50 flex top-25 bottom-5 backdrop-blur-sm bg-black bg-opacity-50"
    >
      <div
        className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
        <div className="py-4 px-4 dark:border-strokedark">
          <div className="w-full flex justify-between">
            <h4 className={'text-title-md2 font-semibold text-black dark:text-white'}>Qr Code</h4>
            <strong className="text-xl align-center cursor-pointer "
                    onClick={tog_standard}
            >&times;</strong>
          </div>
          <div className="grid grid-cols-1 gap-5 justify-normal">
            <div>
              <div style={{ height: 'auto', margin: '0 auto', maxWidth: 300, width: '100%' }}>
                <QRCode
                  size={256}
                  style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                  value={localUrl + '/deviceInfo/' + item?.id}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          </div>
          <div className="p-6.5">
            <button
              type="submit"
              disabled={loading && true}
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Saqlash
              {/*<svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">*/}
              {/*</svg>*/}
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};