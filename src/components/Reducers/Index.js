const InitialState = {
  show_confirmation_box: false,
  file_count: 0,
  data: null,
  errors: [],
  show_Input_form_single: false,
  show_Input_form_multiple: false,
  show_backdrop:false
};

const rootReducer = (state = InitialState, action) => {
  switch (action.type) {
    case 'SHOW_CONFIRMATION_BOX':
      return { ...state, show_confirmation_box: action.payload };
    case 'SET_DATA':
      return { ...state, data: action.payload };
    case 'SHOW_ERRORS':
      return { ...state, errors: [...state.errors, action.payload] };
    case 'CLEAR_ERRORS':
      return { ...state, errors: [] };
    case 'SHOW_INPUT_FORM_SINGLE':
      return { ...state, show_Input_form_single: true };
    case 'SHOW_INPUT_FORM_MULTIPLE':
      return { ...state, show_Input_form_multiple: action.payload };
    case 'SET_FILE_UPLOAD_COUNT':
      return { ...state, file_count: action.payload };
    case 'SET_BACKDROP':{
      return { ...state, show_backdrop: action.payload };
    }
    case 'RESET':
      return {
        ...state,
        show_confirmation_box: false,
        file_count: 0,
        data: null,
        errors: [],
        show_Input_form_single: false,
        show_Input_form_multiple: false,
      };
    default:
      return state;
  }
};

export default rootReducer;
