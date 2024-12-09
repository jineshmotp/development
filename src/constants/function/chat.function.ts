export function chatTimeCalculation(data: any) {
  // VERIFY FUNCTUIN FOR IMAGES EXTENTIONS

  const timestamp = data.timestamp;
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);

  // console.log(' date--->', date);

  const now = new Date();
  const timeDifference = now - date;

  let timeString;

  if (timeDifference < 3600000) {
    // Less than 1 hour
    const minutes = Math.floor(timeDifference / 60000);
    timeString = `${minutes} mm${minutes !== 1 ? 's' : ''} ago`;
  } else if (timeDifference < 86400000) {
    // Less than 24 hours
    const hours = Math.floor(timeDifference / 3600000);
    timeString = `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (timeDifference < 172800000) {
    // Less than 48 hours
    timeString = 'yesterday';
  } else {
    timeString = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit',
      // second: '2-digit',
      // hour12: false,
    });
  }

  return timeString;
}

export function chatTimefromTimestamp(timestamp: any) {
  const date = new Date(timestamp);
  const now = new Date();
  const timeDifference = now - date;
  let timeString;

  if (timeDifference < 3600000) {
    // Less than 1 hour
    const minutes = Math.floor(timeDifference / 60000);
    timeString = `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (timeDifference < 86400000) {
    // Less than 24 hours
    const hours = Math.floor(timeDifference / 3600000);
    timeString = `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (timeDifference < 172800000) {
    // Less than 48 hours
    timeString = 'yesterday';
  } else {
    timeString = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit',
      // second: '2-digit',
      // hour12: false,
    });
  }

  return timeString;
}
