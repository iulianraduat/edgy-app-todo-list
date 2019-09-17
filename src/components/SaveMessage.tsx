import { Snackbar, SnackbarContent } from '@material-ui/core';
import React, { useEffect } from 'react';

const style: React.CSSProperties = {
  backgroundColor: '#008000'
};

interface SaveMessageProps {
  message?: string;
  open: boolean;
}

const SaveMessage: React.FC<SaveMessageProps> = ({ message, open }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(open);

  useEffect(() => setIsOpen(open), [open]);

  const handleClose = React.useCallback(
    (_: unknown, reason: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setIsOpen(false);
    },
    [setIsOpen]
  );

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      open={isOpen}
      autoHideDuration={500}
      onClose={handleClose}
    >
      <SnackbarContent
        aria-describedby="snackbar-message-id"
        message={<div id="snackbar-message-id">{message}</div>}
        style={style}
      />
    </Snackbar>
  );
};

export default SaveMessage;
