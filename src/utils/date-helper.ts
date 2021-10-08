export const monthNum: Record<number, string> = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

export const numMonth = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

export const unit = {
  day: 'day',
  month: 'month',
  year: 'year',
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

export function formatDateToYyMmDd(date: string) {
  let formatedDate = new Date(date);

  const month = formatedDate.getMonth() + 1;
  const day = formatedDate.getDate();

  return `${formatedDate.getFullYear()}-${month < 10 ? '0' : ''}${month}-${
    day < 10 ? '0' : ''
  }${day}`;
}

export function formatDateToIso(date: string | Date): string {
  console.log(date);

  let formatedDate = new Date(date).toISOString().split('T').join(' ');

  return formatedDate.substring(0, formatedDate.length - 5);
}
