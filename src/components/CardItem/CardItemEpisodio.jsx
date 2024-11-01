import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Avatar, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getCharacterById } from '../../api/characterApi';

const CardItemEpisode = ({ name, airDate, episode, characters }) => {
  const [characterDetails, setCharacterDetails] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const details = await Promise.all(
        characters.slice(0, 5).map(async (url) => {
          const id = url.split('/').pop();
          return await getCharacterById(id);
        })
      );
      setCharacterDetails(details);
    };

    fetchCharacters();
  }, [characters]);

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
        <Typography variant="body2" color="textSecondary" sx={{ marginLeft: '10px' }}>
          {episode} | {airDate}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginRight: '10px' }}>
            Personajes en este episodio:
          </Typography>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            {characterDetails.map((character) => (
              <Avatar
                key={character.id}
                src={character.image}
                alt={character.name}
                title={character.name}
                sx={{ width: 32, height: 32 }}
              />
            ))}
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

CardItemEpisode.propTypes = {
  name: PropTypes.string.isRequired,
  airDate: PropTypes.string.isRequired,
  episode: PropTypes.string.isRequired,
  characters: PropTypes.array.isRequired,
};

export default CardItemEpisode;
