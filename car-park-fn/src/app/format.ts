export function formatDate(timestamp: Date) {
    const date = new Date(timestamp);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = String(date.getUTCFullYear()).slice(-2); // get last two digits of year
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  
    return `${day}-${month}-${year}, ${hours}:${minutes}`;
  }