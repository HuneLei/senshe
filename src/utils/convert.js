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

// 格式化日期 - 今天
const convertNewDate = (olddate) => {
  let ret = null;
  if (olddate) {
    const y = olddate.getFullYear();
    let m = (olddate.getMonth() + 1).toString();
    let d = olddate.getDate().toString();
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

export default {
  convertDate,
  convertNewDate,
  convertTime,
  convertSecondTime,
};
