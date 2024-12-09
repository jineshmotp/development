export function formatNumberWithNotation(num: any) {
  if (isNaN(num) || num < 0) {
    return 'Invalid Input';
  }
  if (num < 1000) {
    return num;
  } else if (num < 100000) {
    return (num / 1000).toFixed(1) + 'k';
  } else if (num < 10000000) {
    return (num / 100000).toFixed(1) + ' L';
  } else {
    return (num / 10000000).toFixed(1) + ' Cr';
  }
}

export function formatNumberWithComma(num) {
  if (isNaN(num) || num < 0) {
    return 'Invalid Input';
  }

  const numStr = num.toString();

  if (num < 1000) {
    return '₹ ' + numStr;
  } else if (num < 100000) {
    const thousands = numStr.slice(0, -3);
    const remainder = numStr.slice(-3);
    return '₹ ' + thousands + ',' + remainder + '';
  } else if (num < 10000000) {
    const lakhs = numStr.slice(0, -5);
    const remainder = numStr.slice(-5);
    return '₹ ' + lakhs + ',' + remainder + ' L';
  } else {
    const crores = numStr.slice(0, -7);
    const remainder = numStr.slice(-7);
    return '₹ ' + crores + ',' + remainder + ' Cr';
  }
}

export function imagevideoextention(urivalue: any) {
  const temp = /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/.test(urivalue);
  if (temp) {
    return true;
  } else {
    return false;
  }
}
