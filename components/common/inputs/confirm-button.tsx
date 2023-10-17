import { Button, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import ConfirmModal from './confirm-modal';

type Props = {
  children: React.ReactElement;
  onClick: () => void;
  label?: string;
  hardWord?: string;
};

const Confirm: React.FC<Props> = ({ children, onClick, label, hardWord }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Box onClick={() => setShowModal(true)}>{children}</Box>
      <ConfirmModal
        show={showModal}
        label={label}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          onClick();
          setShowModal(false);
        }}
        hardWord={hardWord}
      />
    </>
  );
};

export default Confirm;
