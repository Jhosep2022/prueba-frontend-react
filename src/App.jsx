import AppRoutes from './routes/AppRoutes';
import './index.css';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </FavoritesProvider>
  );
}

export default App;
