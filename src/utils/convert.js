// 格式化日期
const convertDate = (olddate) => {
  let ret = '';
  if (olddate) {
    const date = (new Date(olddate.replace(/-/g, '/')));
    const y = date.getFullYear();
    let m = (date.getMonth() + 1).toString();
    let d = date.getDate().toString();
    if (m.length < 2) {
      m = `0${m}`;
    }
    if (d.length < 2) {
      d = `0${d}`;
    }
    ret = `${y}-${m}-${d}`;
  }
  return ret;
};

// 格式化日期-年月日
const convertNewDate = (value) => {
  let ret = '';
  if (value) {
    const date = new Date(value)
    const y = date.getFullYear();
    let m = (date.getMonth() + 1).toString();
    let d = date.getDate().toString();
    let hh = date.getHours().toString();
    if (m.length < 2) {
      m = `0${m}`;
    }
    if (d.length < 2) {
      d = `0${d}`;
    }
    if (hh.length < 2) {
      hh = `0${hh}`;
    }
    ret = `${y}-${m}-${d}`;
  }
  return ret;
};

// 格式化日期-时分秒
const convertTime = (value) => {
  const date = new Date(value)
  const y = date.getFullYear();
  let m = (date.getMonth() + 1).toString();
  let d = date.getDate().toString();
  let hh = date.getHours().toString();
  let mm = date.getMinutes().toString();
  let ss = date.getSeconds().toString();
  if (m.length < 2) {
    m = `0${m}`;
  }
  if (d.length < 2) {
    d = `0${d}`;
  }
  if (hh.length < 2) {
    hh = `0${hh}`;
  }
  if (mm.length < 2) {
    mm = `0${mm}`;
  }
  if (ss.length < 2) {
    ss = `0${ss}`;
  }
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
};

// 格式化日期-只要时分秒
const convertSecondTime = (olddate) => {
  let ret = null;
  if (olddate) {
    const date = (new Date(olddate.replace(/-/g, '/')));
    let hh = date.getHours().toString();
    let mm = date.getMinutes().toString();
    if (hh.length < 2) {
      hh = `0${hh}`;
    }
    if (mm.length < 2) {
      mm = `0${mm}`;
    }
    ret = `${hh}:${mm}`;
  }
  return ret;
};

// 保留两位小数点，四舍五入
const twoFloatUp = (number) => {
  let newNumber = number
  newNumber = Math.round(parseFloat(newNumber) * 100) / 100;
  const setNumber = newNumber.toString().split('.');
  if (setNumber.length === 1) {
    newNumber = `${newNumber.toString()}.00`;
  }
  if (setNumber.length > 1) {
    if (setNumber[1].length < 2) {
      newNumber = `${newNumber.toString()}0`;
    }
  }
  return newNumber;
}

// 保留两位小数点，不四舍五入
const twoFloatDown = (number) => {
  let newNumber = number
  const setNumber = newNumber.toString().split('.');
  if (setNumber.length === 1) {
    newNumber = `${newNumber.toString()}.00`;
  }
  if (setNumber.length > 1) {
    if (setNumber[1].length < 2) {
      newNumber = `${newNumber.toString()}0`;
    }
    if (setNumber[1].length > 2) {
      newNumber = `${setNumber[0]}.${setNumber[1].substring(2, 0)}`;
    }
  }
  return newNumber;
}

export default {
  twoFloatUp,
  twoFloatDown,
  convertDate,
  convertNewDate,
  convertTime,
  convertSecondTime,
};
