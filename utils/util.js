const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//过滤数组空元素
const array_filter = value => {
  return value;
}

//数据缓存
const setCache = data => {
  wx.setStorage({
    key: 'food-items',
    data: data,
    success: function (res) {
    },
    fail: function (res) {
    }
  })
}

//过滤数组中重复对象
function array_obj_filter(data, key){
  for (var i in data) {
    if (data[i].name == key) {
      return false;
      break;
    }
  }
  return true;
}

const initData = [
  { "name": '糖醋排骨', 'selected': false },
  { "name": '回锅肉', 'selected': false },
  { "name": '红烧茄子', 'selected': false },
  { "name": '拍黄瓜', 'selected': false },
  { "name": '番茄蛋炒饭', 'selected': false },
  { "name": '火锅', 'selected': false },
  { "name": '西红柿鸡蛋面', 'selected': false },
  { "name": '饺子', 'selected': false },
  { "name": '宫保鸡丁', 'selected': false },
  { "name": '蒸蛋', 'selected': false },
  { "name": '油葱拌面', 'selected': false }
];

module.exports = {
  formatTime: formatTime,
  array_filter: array_filter,
  setCache: setCache,
  array_obj_filter: array_obj_filter,
  initData: initData,
}
