// src/components/auth/LoginPage.tsx

const LoginPage = () => {
  const clientId = import.meta.env.VITE_INSTAGRAM_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_INSTAGRAM_REDIRECT_URI;

  const handleInstagramLogin = () => {
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile&response_type=code`;
    window.location.href = authUrl;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Login to Your Account</h2>
        <button
          onClick={handleInstagramLogin}
          className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
        >
          Login with Instagram
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
