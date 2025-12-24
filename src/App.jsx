import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginForm from './components/forms/LoginForm';
import { useLoginMutation, useVerify2FAMutation } from './hooks/useAuth';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

const AuthApp = () => {
  
  const [tempToken, setTempToken] = useState('');
  const loginMutation = useLoginMutation();
  const verify2FAMutation = useVerify2FAMutation();

  return (
    <div className="auth-container">
      <div style={{
        width: '100%',
        maxWidth: '440px',
        padding: '20px'
      }}>
        <LoginForm 
          loginMutation={loginMutation}
          verify2FAMutation={verify2FAMutation}
          tempToken={tempToken}
          setTempToken={setTempToken}
        />
      </div>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthApp />
    </QueryClientProvider>
  );
}

export default App;
