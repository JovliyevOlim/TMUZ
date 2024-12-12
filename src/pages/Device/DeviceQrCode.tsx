import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'react-qr-code';
import { localUrl } from '../../helpers/api_helpers.ts';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import html2canvas from 'html2canvas';

export const DeviceQrCode = ({ modalOpen, setModalOpen, item, setItem }: any) => {
  const dispatch: any = useDispatch();
  const { loading, isAction, isSuccess } = useSelector((state: any) => state.Device);
  const contentRef = useRef<HTMLDivElement>(null);

  function tog_standard() {
    setModalOpen(!modalOpen);
  }


  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      setItem(null);
    }
  }, [dispatch, isAction]);


  const downloadPdf = () => {
    const divElement = document.getElementById('content');
    html2canvas(divElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png'); // PNG formatidagi tasvir
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${item?.name}.png`; // PNG fayl nomi
      link.click(); // Yuklab olish
    });
  };

  console.log(localUrl + '/deviceInfo/' + item?.id);

  return (
    <Dialog open={modalOpen} onClose={tog_standard} className="relative z-9999">
      <DialogBackdrop
        transition
        className="fixed inset-0  bg-black bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          className="flex min-h-150 sm:min-h-full items-center sm:items-end sm:w-full justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform w-full overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className={'p-8'} ref={contentRef}>
              <div id="content" style={{ height: 'auto', margin: '0 auto', maxWidth: 300, width: '100%' }}>
                <QRCode
                  size={256}
                  style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                  value={localUrl + '/deviceInfo/' + item?.id}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-end gap-2  sm:px-6">
              <button
                type="button"
                onClick={tog_standard}
                className=" justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={downloadPdf}
                type="submit"
                className="flex justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-blue-800 hover:bg-blue-600 sm:mt-0 sm:w-auto"
              >
                Download PNG
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};