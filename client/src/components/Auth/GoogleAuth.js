import React, { useEffect } from 'react';
// import dotenv from 'dotenv';

// dotenv.config();

const GoogleAuthLogin = () => {
  useEffect(() => {
    // Ensure the script is loaded and the GoogleAuth object is initialized
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_CLIENT_ID,  // Your Google OAuth 2.0 client ID
      callback: handleLoginResponse,
    });

    // Render the Google sign-in button
    window.google.accounts.id.renderButton(
      document.getElementById('google-signin-btn'),
      {
        theme: 'outline',
        size: 'large',
      }
    );
  }, []);

  const handleLoginResponse = (response) => {
  try {
    console.log('Google login success', response);

    // Extract the ID token from the response
    const idToken = response.credential;

    if (!idToken) {
      throw new Error('No ID token received from Google');
    }

    console.log('ID Token:', idToken);

    // Send the ID token to your backend server for verification and processing
    // Example: await sendIdTokenToBackend(idToken); // Uncomment if using an async function for backend call
  } catch (error) {
    console.error('Error during Google login:', error.message || error);
    // You can add additional error handling here, such as showing an error message to the user
  }
};

  return <div id="google-signin-btn"></div>;
};

export default GoogleAuthLogin;
