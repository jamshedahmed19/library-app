import React from 'react'
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

interface DialogBoxProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
}

//*  Pass dialog box content as a children
const DialogBox: React.FC<DialogBoxProps> = ({
    open,
    handleClose,
    title,
    children,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h6">{title}</Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default DialogBox;