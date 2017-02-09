import './index.scss'

import config from 'config'

let foo = async () => {
  let promise = new Promise(reslove => {
    setTimeout(() => {
      reslove(config);
    }, 2000)
  })
  let res = await promise;
  return Promise.resolve(res);
};

foo().then(res => console.log(res));
