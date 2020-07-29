import React, { Fragment } from 'react';
import UserInputFormMutiple from './UserInputFormMutiple';
import UserInputFormSingle from './UserInputFormSingle';
import { useSelector, useDispatch } from 'react-redux';

export default function UserInputForm(props) {
  // Code Space
  const {
    file_count,
    data,
    show_Input_form_multiple,
    show_Input_form_single,
    show_confirmation_box,
  } = useSelector((state) => state);

  // Code Space
  return (
    <Fragment>
      {show_Input_form_single && file_count === 1 && <UserInputFormSingle />}

      {show_Input_form_single && file_count > 1 && <UserInputFormSingle />}

      {show_Input_form_multiple && <UserInputFormMutiple />}
    </Fragment>
  );
}
