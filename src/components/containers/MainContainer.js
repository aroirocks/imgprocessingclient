import React from 'react';
import UploadProgressBar from '../UploadInputProgressBar/UploadProgressBar';
import UserInputForm from '../UserInputForm/UserInputForm';
import ConfirmationBox from '../ConfirmationBox/ConfirmationBox';
import Spinner from '../Spinner/Spinner'

export default function MainContainer() {
  return (
    <div>
      <UploadProgressBar />
      <ConfirmationBox />
      <UserInputForm />
      <Spinner/>
    </div>
  );
}
