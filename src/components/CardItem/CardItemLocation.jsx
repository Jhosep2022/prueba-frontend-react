import PropTypes from 'prop-types';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CardItemLocation = ({ name, type, dimension, residents }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
          {name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1" color="textSecondary">
          <strong>Tipo:</strong> {type}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          <strong>Dimensión:</strong> {dimension}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          <strong>Residentes:</strong> {residents.length}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

CardItemLocation.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  dimension: PropTypes.string.isRequired,
  residents: PropTypes.array.isRequired,
};

export default CardItemLocation;
