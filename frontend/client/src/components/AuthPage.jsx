import React from 'react';

const API ='http://localhost:5000';

function AuthPage() {
  const handleGoogleLogin = () => {
    window.location.href = `${API}/auth/google`;
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <h2 className="mb-4">Sign in to continue</h2>
      <button className="btn btn-primary" onClick={handleGoogleLogin}>
        <i className="bi bi-google me-2"></i> Sign in with Google
      </button>
    </div>
  );
}

export default AuthPage;
