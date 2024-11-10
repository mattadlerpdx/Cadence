import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Navbar from '../components/Navbar';
import { getAuth, deleteUser, GoogleAuthProvider, EmailAuthProvider, reauthenticateWithPopup, reauthenticateWithCredential, signOut } from 'firebase/auth';

const Settings = () => {
  const auth = getAuth();
  const navigate = useNavigate(); // Initialize navigation

  const handleUnsubscribe = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('No user is signed in.');
      return;
    }

    try {
      // Check the sign-in provider and re-authenticate accordingly
      if (user.providerData.some(provider => provider.providerId === 'google.com')) {
        // If signed in with Google, re-authenticate with Google
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(user, provider);
      } else if (user.providerData.some(provider => provider.providerId === 'password')) {
        // If signed in with email/password, prompt the user for their password again
        const password = prompt('Please re-enter your password to confirm deletion.');
        if (!password) {
          alert('Password is required to delete your account.');
          return;
        }
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
      } else {
        alert('Unsupported authentication provider.');
        return;
      }

      console.log('Re-authentication successful.');

      // Delete user account
      await deleteUser(user);
      alert('You have successfully unsubscribed and your account has been deleted.');

      // Ensure user is signed out and redirected to the login page
      await signOut(auth);
      navigate('/login'); // Redirect to the login page

    } catch (error) {
      console.error('Error deleting account:', error);

      // Handle specific error codes
      if (error.code === 'auth/requires-recent-login') {
        alert('Please log in again and try deleting your account.');
      } else {
        alert('An error occurred while trying to delete your account. Please try again.');
      }
    }
  };

  return (
    <div>
      {/* Navbar at the top */}
      <Navbar />

      {/* Settings Content */}
      <div className="container my-5">
        <h1>Settings</h1>
        <p>Manage your account settings below.</p>

        {/* Unsubscribe Button */}
        <button className="btn btn-danger mt-3" onClick={handleUnsubscribe}>
          Unsubscribe and Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
