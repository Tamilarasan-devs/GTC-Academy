import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './component/Routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import WhatsAppButton from './component/common/WhatsAppButton';
import ScrollToTop from './component/common/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <AppRoutes />
          <WhatsAppButton />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
