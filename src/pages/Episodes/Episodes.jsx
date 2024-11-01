import { useEffect, useState } from 'react';
import { getEpisodes } from '../../api/episodeApi';
import CardItemEpisode from '../../components/CardItem/CardItemEpisodio';
import { Grid, Container, Typography, Pagination } from '@mui/material';
import usePagination from '../../hooks/usePagination';

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    getEpisodes().then(data => setEpisodes(data.results));
  }, []);

  const { currentItems, currentPage, totalPages, handleChangePage } = usePagination(episodes, itemsPerPage);

  return (
    <Container>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        style={{
          textAlign: 'center',
          margin: '20px 0',
          color: '#3f51b5',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
        }}
      >
        Episodios
      </Typography>

      <Grid container spacing={3}>
        {currentItems.map((ep) => (
          <Grid item xs={12} key={ep.id}>
            <CardItemEpisode
              name={ep.name}
              airDate={ep.air_date}
              episode={ep.episode}
              characters={ep.characters}
            />
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChangePage}
        color="primary"
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      />
    </Container>
  );
};

export default Episodes;
