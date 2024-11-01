import { useFavorites } from '../../context/FavoritesContext';
import CardItemFavorites from '../../components/CardItem/CardItemFavorite';
import { Grid, Container, Typography, CircularProgress } from '@mui/material';

const Favorites = () => {
  const { favorites, loading, toggleFavorite, isFavorite } = useFavorites();

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
        Favoritos
      </Typography>
      <Grid container spacing={3}>
        {favorites.map((favorite) => (
          <Grid item xs={12} sm={6} md={4} key={favorite.id}>
            <CardItemFavorites
              id={favorite.id}
              image={favorite.image}
              name={favorite.name}
              species={favorite.species}
              status={favorite.status}
              details={favorite.details}
              isFavorite={isFavorite(favorite.id)}
              onFavoriteToggle={() => toggleFavorite(favorite)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Favorites;
