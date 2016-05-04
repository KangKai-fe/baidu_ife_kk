/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var cityInput = document.getElementById("aqi-city-input"),
       numInput = document.getElementById("aqi-value-input"),
   aqiCity = cityInput.value.trim(),
    aqiNum = numInput.value.trim();

  if (!aqiCity.match(/^[A-Za-z\u4e00-\u9fa5]+$/)) {
    alert("城市名不合法, 请输入中英文字符!");
    return;
  }
  if ((parseInt(aqiNum) != aqiNum) || (aqiNum < 0) || (aqiNum > 1000)) {
    alert("aqi数值不合法, 请输入0-1000的整数!");
    return;
  }

  aqiData[aqiCity] = aqiNum;
  cityInput.value = "";
  numInput.value = "";
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var aqiTable = document.getElementById("aqi-table"),
      tempList = "",
      aqiTable = document.getElementById("aqi-table"),
          btns = aqiTable.getElementsByTagName("button");

  tempList += "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";

  for (var aqiCity in aqiData) {
    tempList += "<tr><td>" + aqiCity + "</td><td>" + aqiData[aqiCity]+ "</td><td><button>删除</button></td></tr>";
  }

  aqiTable.innerHTML = tempList;

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  for (var i = 0, len = btns.length; i < len; i++) {
    btns[i].onclick = function() {
      delBtnHandle.call(this);
    };
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  var delCity = this.parentNode.parentNode.childNodes[0].innerHTML;

  delete aqiData[delCity];
  renderAqiList();
}

function init() {
  var addBtn = document.getElementById("add-btn");

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  addBtn.onclick = function() {
    addBtnHandle();
  }


}

init();
