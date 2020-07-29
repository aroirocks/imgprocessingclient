import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  showConfirmationRibbon,
  setDataAction,
  show_input_form_single,
  show_input_form_multiple,
  set_file_upload_count,
  showErrors,
  clearErrors,
  resetState,
} from '../Actions/Index';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { URL } from '../../keys';

//Testing
import filetype from '../MIMETYPE/FileType';
//Testing

const Main = () => {
  const progressBarStyle = { height: '25px' };

  const [Img, setImg] = useState('');
  const [imgSize, setimgSize] = useState(null);
  const [uploaded, setuploaded] = useState(0);
  const dispatch = useDispatch();

  const errors = useSelector((state) => state.errors);

  // Alerts
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();
  // Alerts

  const setData = (e) => {
    setImg(e.target.files);
    dispatch(resetState());
    let ImageLength = 0;
    let filecount = 0;

    for (const key in Object.keys(e.target.files)) {
      const imageerr = filetype(e.target.files[key]);

      if (imageerr) {
        dispatch(showErrors(e.target.files[key].name + ' ' + imageerr));
      }
      ImageLength += e.target.files[key].size;
      filecount += 1;
    }

    if (filecount > 5) {
      dispatch(showErrors('More than 5 files not supported'));
    }

    if (ImageLength >= 8000000) {
      dispatch(showErrors('Data too large Max 8 MB allowed'));
    }
  };

  const config = {
    onUploadProgress: (progressEvent) => {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setuploaded(progressEvent.loaded);
    },
    headers: {
      withCredentials: true,
    },
  };

  useEffect(() => {
    let data = new FormData();
    if (Img && errors.length === 0) {
      for (const key in Object.keys(Img)) {
        data.append('avatar', Img[key]);
      }
      let imgArray = [];
      Object.keys(Img).map((e) => {
        imgArray.push({
          name: Img[e]['name'],
          size: Img[e]['size'],
          progress: 0,
          load: true,
          status: 0,
        });
      });
      setimgSize(imgArray);

      let ImageSize = 0;
      imgArray.map((img) => {
        ImageSize += img.size;
      });

      axios.defaults.withCredentials = true;
      console.log('Data: ' + data);

      axios
        .post(`${URL}/upload`, data, config)
        .then((res) => {
          console.log('response received from server: ' + res);
          const str = res.data;
          const filename = str.map((part) => part.split('uploads/')[1]);
          dispatch(set_file_upload_count(res.data.length));
          dispatch(setDataAction(filename));
          if (filename.length === 1) {
            dispatch(show_input_form_single(true));
            dispatch(show_input_form_multiple(false));
            dispatch(showConfirmationRibbon(false));
          } else {
            dispatch(showConfirmationRibbon(true));
          }
        })
        .catch((err) => {
          if (err) {
            console.log('err: ' + err);
            dispatch(showErrors('The upload was not sent'));
          }
        });
    }
  }, [Img]);

  const changePercentage = (progress, size) => {
    let Status = Math.round((progress * 100) / size);
    if (Status > 100) {
      return 100;
    }
    return Status;
  };

  useEffect(() => {
    if (imgSize != null && uploaded > 0) {
      for (let x in imgSize) {
        let size = imgSize[x]['size'];
        let load = imgSize[x]['load'];
        let progress = imgSize[x]['progress'];
        if (progress < size && load) {
          if (uploaded > size) {
            if (progress < size) {
              let decrease = size - progress;
              imgSize[x]['progress'] += decrease;
              imgSize[x]['load'] = false;
              setuploaded(0);
            }
          } else {
            imgSize[x]['progress'] += uploaded;
          }
        }

        imgSize[x]['status'] = changePercentage(
          imgSize[x]['progress'],
          imgSize[x]['size']
        );
      }
    }
  }, [uploaded]);

  const progressBarLogic = () => {
    if (imgSize != null && uploaded > 0 && errors === null) {
      imgSize.map(
        (e) =>
          `<div
        className="progress-bar bg-info progress-bar-striped progress-bar-animated"
        style={{ width: uploaded + '%' }}
      >
        ullo.png
      </div>`
      );
    }
  };

  const styles = {
    width: uploaded + '%',
  };
  let i = 0;

  return (
    <div>
      {errors.length > 0 &&
        errors.map((err) => (
          <div key={i++} className={classes.root}>
            <Alert severity="error">{err}</Alert>
          </div>
        ))}
      <div className="row fileUpload">
        <div className="wrapper p-3 col-0">
          <div className="text-wrapper mb-3 p-4">
            <label htmlFor="inputId" className="label">
              <div className="d-none d-lg-block">
                Click <span className="button"> here </span> to Upload photos
              </div>
              <div className="d-none d-sm-block d-md-block d-lg-none">
                Upload <span className="button"> here </span>
              </div>
              <div className="d-block d-sm-none">
                <span className="button"> Upload </span>
              </div>
            </label>

            <input
              id="inputId"
              type="file"
              name="avatar"
              onChange={setData}
              multiple="multiple"
              className="input-form"
              onClick={(event) => {
                event.target.value = null;
                dispatch(clearErrors());
              }}
            />
          </div>

          {imgSize != null
            ? imgSize.map((e) => {
                return (
                  <div
                    className="progress mb-3"
                    key={e['size']}
                    style={progressBarStyle}
                  >
                    <div
                      className="progress-bar bg-info progress-bar-striped progress-bar-animated"
                      style={{ width: e['status'] + '%' }}
                    >
                      {e['name']}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Main;
