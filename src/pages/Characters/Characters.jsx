import { useEffect, useState } from 'react';
import { getCharacters } from '../../api/characterApi';
import CardItem from '../../components/CardItem/CardItem';
import { Grid, Container, Typography, Pagination, CircularProgress } from '@mui/material';
import usePagination from '../../hooks/usePagination';
import { useFavorites } from '../../context/FavoritesContext';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 3;
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      const data = await getCharacters();
      setCharacters(data.results || []);
      setLoading(false);
    };
    loadCharacters();
  }, []);

  const { currentItems, currentPage, totalPages, handleChangePage } = usePagination(characters, itemsPerPage);

  if (loading) {
    return (
      <Container style={{ textAlign: 'center', marginTop: '20px' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom style={{ textAlign: 'center', margin: '20px 0', color: '#3f51b5', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
        Personajes
      </Typography>
      <Grid container spacing={3}>
        {currentItems.map((char) => (
          <Grid item xs={12} sm={6} md={4} key={char.id}>
            <CardItem
              id={char.id}
              image={char.image}
              name={char.name}
              species={char.species}
              status={char.status}
              details={`Especie: ${char.species} | Estado: ${char.status}`}
              isFavorite={isFavorite(char.id)}
              onFavoriteToggle={() => toggleFavorite(char)}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChangePage}
        color="primary"
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      />
    </Container>
  );
};

export default Characters;
