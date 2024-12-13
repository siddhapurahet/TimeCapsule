import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AUTH } from '../../constants/actionTypes';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

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

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleLoginResponse = (response) => {
  try {
    console.log('Google login success from handle func', response);

    // Extract the ID token from the response
    const idToken = response.credential;

    if (!idToken) {
      throw new Error('No ID token received from Google');
    }

    // Decoding the ID token to extract user info
    const decodedToken = jwtDecode(idToken);
    // console.log('Decoded Token:', decodedToken);

    // Extracting the user info from the decoded token
    const { email, given_name, family_name, sub } = decodedToken;


    dispatch({type: AUTH, data: { email, givenName: given_name, familyName: family_name, userId: sub, idToken }});
    Navigate('/');
    // console.log('ID Token from handle func:', decodedToken);

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
