export const apiMainConfig = {
  baseUrl: 'https://api.diploma.kalyazhinkova.nomoredomains.club',
  headers: {
    Authorization: '',
    'Content-Type': 'application/json',
  },
};

export const numberCard = () => {
  const number = { init: 12, more: 3 };

  if (window.innerWidth < 911) {
    number.init = 8;
    number.more = 2;
  }

  if (window.innerWidth < 561) {
    number.init = 5;
    number.more = 2;
  }
};
