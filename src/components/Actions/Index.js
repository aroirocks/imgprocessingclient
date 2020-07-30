export function showConfirmationRibbon(payload) {
  return {
    type: 'SHOW_CONFIRMATION_BOX',
    payload: payload,
  };
}

export function setDataAction(payload) {
  return {
    type: 'SET_DATA',
    payload: payload,
  };
}

export function showErrors(payload) {
  return {
    type: 'SHOW_ERRORS',
    payload: payload,
  };
}

export function clearErrors() {
  return {
    type: 'CLEAR_ERRORS',
  };
}

export function show_input_form_single(payload) {
  return {
    type: 'SHOW_INPUT_FORM_SINGLE',
    payload: payload,
  };
}

export function show_input_form_multiple(payload) {
  return {
    type: 'SHOW_INPUT_FORM_MULTIPLE',
    payload: payload,
  };
}

export function set_file_upload_count(payload) {
  return {
    type: 'SET_FILE_UPLOAD_COUNT',
    payload: payload,
  };
}

export function resetState(payload) {
  return {
    type: 'RESET',
  };
}

export function set_backdrop(payload) {
  return {
    type: 'SET_BACKDROP',
    payload: payload,
  };
}