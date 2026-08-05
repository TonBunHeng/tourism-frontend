import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';
import { initTheme } from './utils/Theme';

function App() {
  useEffect(() => {
    initTheme();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#09090b] text-gray-900 dark:text-zinc-100 transition-colors duration-200">
      <AppRoutes />
    </div>
  );
}

export default App;