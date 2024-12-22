import React from 'react';
import { Modal } from '../molcules/Modal';
import { PositiveButton } from '../atoms/PositiveButton';
import { NegativeButton } from '../atoms/NegativeButton';

type ConfirmationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    label: string;
    confirmButtonLabel: string;
    cancelButtonLabel?: string;
};

export const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    label,
    confirmButtonLabel,
    cancelButtonLabel,
}: ConfirmationModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            overlayClassName="flex items-center justify-center"
            contentClassName="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
        >
            <div className="text-center mb-4">
                <p>{label}</p>
            </div>
            <div className="flex justify-end space-x-4">
                {cancelButtonLabel && (
                    <NegativeButton onClick={onClose} className="px-4 py-2">
                        {cancelButtonLabel}
                    </NegativeButton>
                )}
                <PositiveButton onClick={onConfirm} className="px-4 py-2">
                    {confirmButtonLabel}
                </PositiveButton>
            </div>
        </Modal>
    );
};
