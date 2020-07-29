import React from 'react';
import UploadProgressBar from '../UploadInputProgressBar/UploadProgressBar';
import UserInputForm from '../UserInputForm/UserInputForm';
import ConfirmationBox from '../ConfirmationBox/ConfirmationBox';

export default function MainContainer() {
  return (
    <div>
      <UploadProgressBar />
      <ConfirmationBox />
      <UserInputForm />
    </div>
  );
}
