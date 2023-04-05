import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from './theme/ThemeProvider';
import Modal, { ModalProvider } from './contexts/ModalContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthGuard } from './guards';
// const queryClient = new QueryClient();
function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <ModalProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <AuthGuard>{content}</AuthGuard>
          <Modal />
          <ToastContainer autoClose={2000} newestOnTop />
        </LocalizationProvider>
      </ModalProvider>
    </ThemeProvider>
  );
}
export default App;
