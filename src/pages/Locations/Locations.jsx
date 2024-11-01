import { useEffect, useState } from 'react';
import { getLocations } from '../../api/locationApi';
import CardItemLocation from '../../components/CardItem/CardItemLocation';
import { Grid, Container, Typography, Pagination } from '@mui/material';
import usePagination from '../../hooks/usePagination';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    getLocations().then(data => setLocations(data.results));
  }, []);

  const { currentItems, currentPage, totalPages, handleChangePage } = usePagination(locations, itemsPerPage);

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
        Locaciones
      </Typography>
      
      <Grid container spacing={3}>
        {currentItems.map((loc) => (
          <Grid item xs={12} key={loc.id}>
            <CardItemLocation
              name={loc.name}
              type={loc.type}
              dimension={loc.dimension}
              residents={loc.residents}
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

export default Locations;
