import React, { Fragment, useState } from 'react';
import { URL } from '../../keys';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

export default function UserInputFormSingle(props) {
  const { data } = useSelector((state) => state);

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

  const Obj = [];
  const imgObj = data.map((data, index) => {
    const obj = {
      data: data,
      compress: 0,
      convertFrom: 0,
      convertTo: 0,
      resizeHeight: 0,
      resizeWidth: 0,
      id: index,
    };
    Obj.push(obj);
  });

  const onDownload = (event) => {
    Obj.map((obj) => {
      if (parseInt(event.target.name) === parseInt(obj.id)) {
        axios({
          url: `${URL}/process`,
          method: 'POST',
          responseType: 'blob', // important
          data: obj,
        }).then((res) => {
          console.log("response: "+ res)
          var filename = '';
          var disposition = res.headers['content-disposition'];
          if (disposition && disposition.indexOf('attachment') !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
              filename = matches[1].replace(/['"]/g, '');
              let txtremoved = /\____(.*?)\./;
              filename = filename.replace(txtremoved, '.');
              console.log("FIlename: " +filename)
            }
          }
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
        });
      }
    });
  };

  const imgtype = (img) => {
    const fileArray = ['jpg', 'png', 'webp', 'tiff', 'jpeg'];

    const imgname = img.split('.');
    let img_name = null;
    if (imgname.length > 1) {
      fileArray.map((file) => {
        if (file === imgname[1].toLowerCase()) {
          img_name = imgname[1];
        }
      });
      return img_name;
    }
  };

  const onChange = (input, value) => {
    input = input.split(':');
    Obj.map((obj) => {
      if (obj.id === parseInt(input[0])) {
        obj[input[1]] = value;
      }
    });
  };

  const handleCompressChange = (event) => {
    onChange(event.target.name, event.target.value);
  };

  const handleFromChange = (event) => {
    onChange(event.target.name, event.target.value);
  };

  const handleToChange = (event) => {
    onChange(event.target.name, event.target.value);
  };

  const handlewidthChange = (event) => {
    onChange(event.target.name, event.target.value);
  };
  const handleheightChange = (event) => {
    onChange(event.target.name, event.target.value);
  };

  return (
    <Fragment>
      {data != null &&
        data.map((data, index) => (
          <div className="card mt-5" key={data}>
            <div className="card-body">
              <div className="row">
                <div className="col-xl-1 mr-4 align-self-center" align="center">
                  <img src={`${URL}/${data}`} alt={data} />
                </div>

                <div className="col-xl-2 m-1">
                  <div className="form-group">
                    <label htmlFor="Compress"></label>
                    <select
                      className="form-control"
                      value={process.compress}
                      name={index + ':compress'}
                      onChange={handleCompressChange}
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
                <div className="col-xl-3 m-1">
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="form-group">
                        <label htmlFor="Convert"></label>

                        <select
                          className="form-control"
                          name={index + ':convertFrom'}
                          value={process.convertFrom}
                          onChange={handleFromChange}
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
                          onChange={handleToChange}
                          name={index + ':convertTo'}
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

                <div className="col-xl-3 m-1">
                  <div className="row">
                    <div className="col-xl-6">
                      <div className="form-group">
                        <label htmlFor="Width"></label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="800"
                          onChange={handlewidthChange}
                          name={index + ':resizeHeight'}
                        />
                        <small className="form-text text-muted">Width</small>
                      </div>
                    </div>

                    <div className="col-xl-6">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1"></label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="560"
                          onChange={handleheightChange}
                          name={index + ':resizeWidth'}
                        />
                        <small className="form-text text-muted">Height</small>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-2 ml-xl-2 align-self-center mb-xl-2 d-md-flex justify-content-md-center d-sm-flex justify-content-sm-center d-lg-flex justify-content-lg-center">
                  <div className="row justify-content-xl-center">
                    <div className="col-xl-12">
                      <button
                        type="submit"
                        className="btn btn-xl-lg btn-outline-secondary"
                        name={index}
                        onClick={onDownload}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </Fragment>
  );
}
