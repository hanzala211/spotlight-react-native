export const formatDate = (date: string) => {
  const now = new Date();
  let diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

  const intervals = [
    { label: 'second', value: 60 },
    { label: 'minute', value: 60 },
    { label: 'hour', value: 24 },
    { label: 'day', value: 7 },
    { label: 'week', value: 4.3 },
    { label: 'month', value: 12 },
    { label: 'year', value: Infinity },
  ];

  let result;
  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    if (diffInSeconds < interval.value) {
      result = Math.floor(diffInSeconds) + ` ${interval.label}${Math.floor(diffInSeconds) !== 1 ? 's' : ''} ago`;
      break;
    }
    diffInSeconds /= interval.value;
  }

  return result;
};

