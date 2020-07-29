import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  show_input_form_single,
  show_input_form_multiple,
  showConfirmationRibbon,
} from '../Actions/Index';
import './confirmation.module.css';

export default function ConfirmationBox() {
  const dispatch = useDispatch();

  const { show_confirmation_box } = useSelector((state) => {
    return state;
  });

  const onclickTogetherHandler = (e) => {
    dispatch(show_input_form_multiple(true));
    dispatch(showConfirmationRibbon(false));
  };

  const onclickIndividualHandler = (e) => {
    dispatch(show_input_form_single(true));
    dispatch(showConfirmationRibbon(false));
  };

  return (
    <div className="m-5">
      {show_confirmation_box && (
        <div className="card">
          <div className="row">
            <div className="col text-center ">
              <button
                type="button"
                className="btn btn-outline-primary btn-lg  m-4"
                onClick={onclickTogetherHandler}
              >
                Process Together
              </button>
            </div>

            <div className="col text-center">
              <button
                type="button"
                className="btn btn-outline-danger btn-lg  m-4"
                onClick={onclickIndividualHandler}
              >
                Process Individually
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
