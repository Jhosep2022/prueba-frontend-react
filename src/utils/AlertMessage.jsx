import PropTypes from 'prop-types';
import { Alert, Snackbar } from '@mui/material';

const AlertMessage = ({ open, onClose, severity, message, duration = 3000 }) => {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

AlertMessage.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
};

export default AlertMessage;
