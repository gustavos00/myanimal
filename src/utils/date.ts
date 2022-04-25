export const formatDate = (unformattedDate: string) => {
  const splitedDate = new Date(unformattedDate)
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '')
    .split(' ');

  const date = splitedDate[0].split('-').reverse().join('/');
  const splitedTime = splitedDate[1].split(':');
  const fullTime = splitedTime[0] + ':' + splitedTime[1];
  return `${date} ${fullTime}`;
};
