import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AlertMessage from '../../utils/AlertMessage';
import { useFavorites } from '../../context/FavoritesContext';

const ExpandMore = styled((props) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
}));

const CardItemFavorites = ({
  id,
  image = '',
  name = 'Nombre no disponible',
  species = '',
  status = '',
  details = 'Detalles no disponibles',
  onClick,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = async () => {
    setShowAlert(true);
    if (!isFavorite(id)) {
      setAlertMessage('Guardado en favoritos');
      setAlertSeverity('success');
    } else {
      setAlertMessage('Eliminado de favoritos');
      setAlertSeverity('info');
    }
    
    await toggleFavorite({ id, name, image, species, status, details });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <AlertMessage
        open={showAlert}
        onClose={handleCloseAlert}
        severity={alertSeverity}
        message={alertMessage}
      />

      <Card sx={{ maxWidth: 345, margin: 2 }} onClick={onClick}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="character">
              {name ? name.charAt(0) : 'N/A'}
            </Avatar>
          }
          title={name}
          subheader="Información adicional"
        />
        <CardMedia component="img" height="194" image={image} alt={name} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {details}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Tooltip title={isFavorite(id) ? 'Eliminar de favoritos' : 'Agregar a favoritos'}>
            <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}>
              {isFavorite(id) ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
          <ExpandMore
            expand={expanded ? 'true' : 'false'}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Más detalles sobre {name}:</Typography>
            <Typography paragraph>
              Aquí puedes agregar información extra sobre este personaje o locación.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

CardItemFavorites.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  name: PropTypes.string,
  species: PropTypes.string,
  status: PropTypes.string,
  details: PropTypes.string,
  onClick: PropTypes.func,
};

export default CardItemFavorites;
