export const changeTime = (mins) => {
  mins = mins.slice(0, 3).trim()
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;

  if (hours === 0) return minutes + 'm';
  
  return hours + 'h ' + minutes + 'm';
}
