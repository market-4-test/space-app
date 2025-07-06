import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import useConfirm from '@/core/hooks/useConfirm';
import ButtonBase from '@/core/views/components/controls/buttons/button-base.component';

const ConfirmOverlay: React.FC = observer(() => {
  const confirm = useConfirm();

  useEffect(() => {
    if (confirm.isShow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [confirm.isShow]);

  if (!confirm.isShow) {
    return null;
  }

  return (
    <div className="ConfirmOverlay z-[1000] fixed inset-0 flex items-center justify-center transition">
      <div className="ConfirmOverlay__Wrap flex flex-col gap-5 py-10 px-6 bg-neutral-100 max-w-[460px] w-full text-center rounded-md">
        <div className="ConfirmOverlay__Title text-[24px] font-semibold text-primary-gray-400">
          {confirm.title}
        </div>
        {confirm.desc && (
          <div className="ConfirmOverlay__Desc text-primary-gray-400">{confirm.desc}</div>
        )}
        <div className="ConfirmOverlay__Buttons flex items-center justify-center gap-4">
          <ButtonBase onClick={() => confirm.cancel()}>
            {confirm.cancelButtonText}
          </ButtonBase>
          <ButtonBase type="secondary" onClick={() => confirm.confirm()}>
            {confirm.confirmButtonText}
          </ButtonBase>
        </div>
      </div>
      <div
        className="ConfirmOverlay__Bg -z-10 fixed inset-0 bg-gray-400/75"
        onClick={() => confirm.cancel()}
      ></div>
    </div>
  );
});

export default ConfirmOverlay;