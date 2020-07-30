import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { URL } from '../../keys';
import axios from 'axios';
import {set_backdrop} from '../Actions/Index'

export default function UserInputFormMutiple() {
  const { data } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [process, setProcess] = useState({
    process: {
      imageid: '',
      compress: 0,
      convertFrom: 'Choose',
      convertTo: 'None',
      resizeHeight: 0,
      resizeWidth: 0,
    },
  });
  const obj = {
    data: data,
    compress: 0,
    convertFrom: 0,
    convertTo: 0,
    width: 0,
    height: 0,
  };

  const onDownload = () => {
    //send data to server
    dispatch(set_backdrop(true))
    axios({
      url: `${URL}/processall`,
      method: 'POST',
      responseType: 'blob', // important
      data: obj,
    }).then((res) => {
      var filename = '';
      var disposition = res.headers['content-disposition'];
      if (disposition && disposition.indexOf('attachment') !== -1) {
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
          let txtremoved = /\#+(.*?)\./;
          filename = filename.replace(txtremoved, '.');
        }
      }
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      dispatch(set_backdrop(false))
      link.click();
    });
  };

  const onChange = (name, value) => {
    obj[name] = value;
  };

  const handleChange = (event) => {
    onChange(event.target.name, event.target.value);
  };

  return (
    <div>
      <div className="card mt-5">
        <div className="card-body">
          <div className="row">
            <div className="col-xl-12">
              <div className="row justify-content-center">
                {data != null &&
                  data.map((data) => {
                    return (
                      <div
                        key={data}
                        className="col-xl-auto col-md-auto col-sm-auto col-xs-auto p-4"
                      >
                        <img src={`${URL}/${data}`} alt="" key={data} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="Compress">Compress</label>
                <select
                  className="form-control"
                  value={process.compress}
                  name="compress"
                  onChange={handleChange}
                >
                  <option value="0">0%</option>
                  <option value="20">20%</option>
                  <option value="40">40%</option>
                  <option value="60">60%</option>
                  <option value="80">80%</option>
                </select>
                <small className="form-text text-muted">Compress</small>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12 m-1">
              <div className="row">
                <div className="col-xl-6">
                  <div className="form-group">
                    <label htmlFor="Compress">Compress</label>
                    <select
                      className="form-control"
                      name="convertFrom"
                      value={process.convertFrom}
                      onChange={handleChange}
                    >
                      <option value="Choose">Choose</option>
                      <option value="jpg">JPG</option>
                      <option value="png">PNG</option>
                      <option value="webp">WEBP</option>
                      <option value="tiff">TIFF</option>
                    </select>
                    <small className="form-text text-muted">From</small>
                  </div>
                </div>

                <div className="col-xl-6">
                  <div className="form-group">
                    <label htmlFor="ConvertTo"></label>
                    <select
                      className="form-control"
                      value={process.convertTo}
                      onChange={handleChange}
                      name="convertTo"
                    >
                      <option value="None">None</option>
                      <option value="jpg">JPG</option>
                      <option value="png">PNG</option>
                      <option value="webp">WEBP</option>
                      <option value="tiff">TIFF</option>
                    </select>
                    <small className="form-text text-muted">To</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12 m-1">
              <div className="row">
                <div className="col-xl-6">
                  <div className="form-group">
                    <label htmlFor="Width"></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="800"
                      onChange={handleChange}
                      name="width"
                    />
                    <small className="form-text text-muted">Width</small>
                  </div>
                </div>

                <div className="col-xl-6">
                  <div className="form-group">
                    <label htmlFor="Height"></label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="560"
                      onChange={handleChange}
                      name="height"
                    />
                    <small className="form-text text-muted">Height</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-lg btn-outline-secondary"
              onClick={onDownload}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
