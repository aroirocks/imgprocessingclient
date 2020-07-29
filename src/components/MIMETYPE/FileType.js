const checkfiletype = (file) => {
  const type = file.type;

  switch (type) {
    case 'image/jpeg':
      return '';
    case 'image/gif':
      return 'file format not supported';
    case 'image/x-icon':
      return 'file format not supported';
    case 'image/svg+xml':
      return 'file format not supported';
    case 'image/webp':
      return '';
    case 'image/png':
      return '';
    default:
      return 'file format not supported';
  }
};

export default checkfiletype;
