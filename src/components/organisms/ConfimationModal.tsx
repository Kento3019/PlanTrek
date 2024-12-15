import React from 'react';
import { Modal } from '../molcules/Modal';
import { PositiveButton } from '../atoms/PositiveButton';
import { NegativeButton } from '../atoms/NegativeButton';

type Props = {
    isOpen?: boolean;
    onClose: () => void;
    handleModalAction: () => void;
    label: string;
    openButtonlabel: string;
    closeButtonlabel?: string;
}

export const ConfimationModal = ({ label, openButtonlabel, closeButtonlabel, isOpen = false, onClose, handleModalAction }: Props) => {
    return (
        <Modal isOpen={isOpen}>
            <span className="mb-4 text-center">{label}</span>
            <div className="flex flex-row">
                <PositiveButton
                    onClick={handleModalAction}
                    className='flex-1 m-1 px-2 rounded-md '>
                    {openButtonlabel}
                </PositiveButton>
                {closeButtonlabel && (
                    <NegativeButton
                        onClick={onClose}
                        className='flex-1 m-1'>
                        {closeButtonlabel}
                    </NegativeButton>
                )}
            </div>
        </Modal>
    );
};
