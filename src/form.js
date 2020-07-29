import React, { useState, useEffect } from 'react';

export default function FileUploader() {
  const [files, setFiles] = useState(null);

  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files;
    setFiles(fileUploaded);
    event.preventDefault();
    // console.log(fileUploaded);
  };

  useEffect(() => {
    console.log(files);
  }, [files]);
  return (
    <div>
      <button onClick={handleClick}> Upload a file</button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
        multiple
      />
    </div>
  );
}
