import React from 'react';
import { Modal } from '../molcules/Modal';
import { ScheduleFormPage } from '../Pages/ScheduleFormPage';

type Props = {
    isOpen?: boolean;
    onClose: () => void;
};

export const FormModal = ({ isOpen = false, onClose }: Props) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            header={
                <div className="rounded-t-xl p-2 font-semibold bg-indigo-600 text-white flex items-center justify-center">
                    <p>新規予定</p>
                </div>
            }
            overlayClassName="items-end"
            contentClassName={`h-svh sm:h-full w-full bg-white rounded-t-xl shadow-2xl transform transition-transform duration-500 ${isOpen ? 'translate-y-0' : 'translate-y-full'
                }`}
            style={{ maxWidth: '100%', maxHeight: '98%' }}
        >
            <div className="px-4">
                <ScheduleFormPage onClose={onClose} />
            </div>
        </Modal>
    );
};
