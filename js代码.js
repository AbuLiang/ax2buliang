function Person() {}
var person1 = new Person();

person1.hasOwnProperty('name'); //判断实例person1有没有属性name，有true；原型有false；实例原型都有true
Person.prototype.isPrototypeOf(person1); //判断原型Person.prototype有没有实例person1
Object.getPrototypeOf(person1); //返回person1的原型，即person1.__proto__和Person.prototype


/** 
 * push类数组
 */
//var arr = new Array(); Array is not a constructor,换成下面
var arr = new [].constructor();
arr.push(1, 2); //[1,2]
arr.push([3, 4]); //不成功，无法push类数组
arr.push.apply(arr, [3, 4]); // [1,2,[3,4]] 可以借助apply实现 
arr.push.apply(obj, arguments);
arr.push(argument[0], argument[1]);

/** 
 * 类数组
 *  1.具有索引属性（数字）
    2.有length属性
    3.最好加上push属性
    不是由Array构造函数创建，依然可以调用数组操作方法
*/
var obj = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3,
  push: Array.prototype.push
};

/** 
 * 数组去重
 */
var arr = [1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 3];
Array.prototype.unique = function () {
  var brr = [];
  obj = {};
  for (i = 0; i < this.length; i++) {
    if (!obj[this[i]]) {
      obj[this[i]] = 'asd';
      brr.push(this[i]);
    }
  }
  return brr;
};
arr.unique();

/** 
 * 数组push方法的实现
 */

Array.prototype.push = function (param) {
  this[this.length] = param;
  this.length++;
};



/** 
 * 数组最大子数组
 */
var arr = [1, 2, 3, 5, 2, 3, 5, 1, 6, 23];

function unique(param) {
  var brr = [];
  var dic = {};
  // console.log(param.length);
  for (i = 0; i < param.length; i++) {
    if (!dic[param[i]]) {
      dic[param[i]] = 'unique';
      brr[brr.length] = param[i];
    }
  }
  return brr;
}

console.log(unique(arr));



/** 
 * 出现最多的元素
 */

/* jshint esversion: 6 */
(function () {
  "use strict";
})();

var arr = [1, 2, 3, 5, 2, 3, 5, 1, 6, 23, 3, 5, 5, 5, 23, 1, 2];

Array.prototype.maxUnique = function () {
  let flag = {
    key: '',
    value: 0
  };
  let left = 0;
  let right = 0;
  flag.key = this[0];
  flag.value = 1;
  while (right < this.length) {
    if (this[left] == this[right]) {
      right++;
    } else {
      if (right - left > flag.value) {
        flag.key = this[left];
        flag.value = right - left;
      }
      left = right;
    }
  }
  return flag.key;
};

arr.sort();
console.log(arr.maxUnique());


/* 
 * forEach 实现 push([2,3,4,5]) 
 * 要注意forEach中函数的this指向，看onenote
 * forEach(function(currentValue,index,arr){},thisValue); 
 * function的第三个参数为调用forEach的数组对象
 * forEach第二个参数赋值给function.this ,默认undefined
 */
let arr = [];
arr.push(1);
console.log(arr);
let arr2 = [2, 3, 4, 5];
arr2.forEach(myeach, arr);

function myeach(item, index) {
  this.push(item); // arr.push(arr2)
  console.log(this);
}
// 使用箭头函数 箭头函数内this已经按照词法作用域绑定了，无法指向arr
// 直接调用arr竟然好使 ？
let arr = [];
arr.push(1);
let arr2 = [2, 3, 4, 5];
arr2.forEach((item, index) => {
  arr.push(item);
  console.log(arr);
}, arr);


/**
 * call apply实现bind //老版浏览器不支持bind
 */

/** 
 * js归并排序实现数组sort方法
 */

/** 
 * 原生js实现快排
 * 
 */

/** 
 * this指向
 */
//object中this指向对象本身
var name = 'window.name';
var obj = {
  name: 'obj.name',
  sayName: function () {
    var that = this;
    console.log(that); // obj
    return function () {
      console.log(that.name);
    };
  }
};

obj.sayName()();

//函数中this指向 window
function T() {
  var func = function () {
    console.log(this);
  };
  return func;
}
var t = new T();
t();

//匿名函数this指向 window （匿名函数执行环境具有全局性 ？）
function T() {
  var func = function () {
    return function () {
      console.log(this);
    };
  };
  return func;
}
var t = T();
t()();


/* 
 * 原生js ajax
 */
var ajax = new XMLHttpRequest();
ajax.onreadystatechange = function () {
  if (ajax.readyState == 4 && ajax.status == 200) {
    console.log(ajax.responseXML);
    document.querySelector('h1').innerHTML = ajax.responseXML;
  }
}; // onreadystatechange必须在open()前指定
ajax.open("get", "url", async = true);
// post提交数据,必须添加此行; 也有人说不用（jquery下）
ajax.setResponseHeader("Content-type", "application/x-www-form-urlencoded");
ajax.send();

// 原生js post提交表单
function submitData() {
  var XHR = new XMLHttpRequest();
  XHR.onreadystatechange = function () {
    if (XHR.readyState == 4) {
      if ((XHR.status >= 200 && XHR.status < 300) || XHR.status == 304) {
        console.log(XHR.responseText);
      } else {
        console.log("Request was unsuccessful: " + XHR.status);
      }
    }
  };
  XHR.open("post", "postform.php", true);
  XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  var form = document.getElementById("user-info");
  XHR.send(serialize(form)); // XHR.send(new FormData(form));
}

// 向URL添加查询字符串参数
function addURLParam(url, name, value) {
  url += (url.indexOf('?') == -1 ? "?" : "&");
  url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
  return url;
}

/**
 * jquery 初始化
 */
$(document).ready(function () {});
$(function () {});
$(function () {
  $('a').click(function () {
    alert("Hello world!");
  });
});


/* 
 * jquery ajax 
 */

$(function () {
  $('#send').click(function () {
    $ajax({
      type: 'post',
      url: 'test.json',
      data: {
        username: $("#username").val(),
        content: $("#content").val()
      },
      dataType: 'json',
      success: function (data) {
        $("#resText").empty();
        var html = '';
        $.each(data, function (commentIndex, comment) {
          html += '<div class="comment"><h3>' + comment['username'] + '</h3>:<p class="para">' + comment['content'] + '</p></div>'
        });
        $("#resText").html(html);
      }
    });
  });
});


$(document).ready(function () {
  $ajax({
    type: "get",
    url: "https://api.passport.xxx.com/checkNickname?username=" + mylogin.username + "&token=" + mylogin.token + "&nickname=" + nickname + "&format=jsonp&cb=?",
    port: 8080,
    async: false, // 默认true异步
    time: 1000, //haomiao
    cache: false,
    dataType: "jsonp", // jsonp下，jquery会自将‘cb=?’中的？替换成正确的函数，以执行回调函数
    success: function (data) {
      if (data.errorcode == 0) {
        $('#nickname').val(mylogin.name);
      } else {
        $('#nickname').val("name");
      }
    },
    error: function (jqXHR) {
      console.log("Error:" + jqXHR.status);
    },
  });
});

JSON.parse(); // zhuan js
JSON.stringify(); // zhuan json

$(function () {
  $ajax({
    type: "post",
    url: "http://api.passport.pptv.com/v3/login/qrcode.do", // POST请求不需要拼url，指定data，ajax传递时会自动拼成url。
    port: 8080,
    async: false, // 默认true异步
    time: 1000, //haomiao
    cache: false,
    dataType: "jsonp", // jsonp下，jquery会自将‘cb=?’中的？替换成正确的函数，以执行回调函数
    data: {
      from: "clt",
      qrid: qrid,
      username: username,
      token: token,
    },
    success: function (data) {
      if (data.errorcode == 0) {
        $('#nickname').val(mylogin.name);
      } else {
        $('#nickname').val("name");
      }
    },
    error: function (jqXHR) {
      console.log("Error:" + jqXHR.status);
    },
  });
});

/** 
 *  函数的 length属性
 */
// 指定参数默认值，length将返回没有指定默认值的参数个数
(function (a) {}).length // 1
  (function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2

  // length属性的含义是该函数预期传入的参数个数 
  // 指定默认值后 就不计算该参数了
  (function (...args) {}).length // 0

// 如果设置默认值的参数不是尾参数，后面的参数也不算
(function (a, b = 5, c) {}).length // 1
  (function (a, b = 5, c = 5) {}).length // 1



/** 
 * add 没加 var 全局的
 * 内层保存了外层作用域 ，取得到 a = 1
 */
var a = 0,
  b = 0;

function add(a) {
  add = function (b) {
    console.log(++a + b++);
  }
  console.log(a++);
}

add(1); // 1
add(2); // 5


/** 
 * 
 */
var c = {
  name: 'Json',
  sayName: function () {
    console.log(this.name);
  }
};
var name = 'Aaron';

function sayName() {
  var sss = c.sayName;
  sss();
  c.sayName();
  (c.sayName)();
  (b = c.sayName)();
}

sayName();
// undefined
// Json
// Aaron
// undefined


/** 
 * 
 */
console.log(!!3); //  true
console.log(!!''); //  false
console.log(!!-1); //  true
console.log(!!('' || null || 0 || 'a')); //  true
console.log(!!''); //  false
console.log(!!'texto'); //  true
console.log(!!0); //  false
console.log(!!undefined); //false  
console.log(!!('' || null || 0 || '')); //  false
console.log(!![]); //  true
console.log(!!null); //  false
console.log(!!{}); //  true
console.log(!!Infinity); //  true
console.log(!!(isAtivo = true)); //  true
console.log(!!NaN); //  false


/** 
 * [1,2,3].splice(1,1,1) == [2] //false
 */

[1, 2, 3].splice(1, 1, 1) //[2]
// splice返回的是 删除的那部分
lis = [1, 2, 3];
lis.splice(1, 1, 1);
lis //[1, 1, 3]
lis.splice(1, 1, 1) //[1]

//引用类型比较的是地址
a = [2]
b = [2]
a == b //false
c = a
a == c //true


/** 
 * 实现深度复制的 函数的 完整代码
 */



/** 
 * promise完整代码
 * https://github.com/xieranmaya/blog/issues/2
 */


/** 
 * 数组实现队列
 */
// 经典 方法
function Queue() {
  let items = [];
  let front = 0;
  let rear = -1;
  let count = 0;

  //Add a new element in queue
  this.enqueue = (elm) => {
    items[++rear] = elm;
    count++;
  };

  //Remove element from the queue
  this.dequeue = () => {
    let current = front++;
    let temp = items[current];
    items[current] = null;
    count--;
    return temp;
  };

  //Return the first element from the queue
  this.front = () => {
    return items[front];
  };

  //Return the last element from the queue
  this.rear = () => {
    return items[rear];
  };

  //Check if queue is empty
  this.isEmpty = () => {
    return count === 0;
  };

  //Return the size of the queue
  this.size = () => {
    return count;
  };

  //Print the queue
  this.print = () => {
    let temp = items.filter((e) => e !== null);
    console.log(temp.toString());
  };

}

// 利用数组方法
function Queue() {
  let items = [];

  //Add a new element in queue
  this.enqueue = (elm) => {
    items.push(elm);
  };

  //Remove element from the queue
  this.dequeue = () => {
    return items.shift();
  };

  //Return the first element from the queue
  this.front = () => {
    return items[0];
  };

  //Return the last element from the queue
  this.rear = () => {
    return items[items.length - 1];
  };

  //Check if queue is empty
  this.isEmpty = () => {
    return items.length == 0;
  };

  //Return the size of the queue
  this.size = () => {
    return items.length;
  };

  //Print the queue
  this.print = () => {
    console.log(items.toString());
  };

}

//   Making the properties and methods private with closure and IIFE (Immediately Invoked Function Expression).
let Queue = (function () {
  return function Queue() {
    let items = [];

    //Add a new element in queue
    this.enqueue = (elm) => {
      items.push(elm);
    };

    //Remove element from the queue
    this.dequeue = () => {
      return items.shift();
    };

    //Return the first element from the queue
    this.front = () => {
      return items[0];
    };

    //Return the last element from the queue
    this.rear = () => {
      return items[items.length - 1];
    };

    //Check if queue is empty
    this.isEmpty = () => {
      return items.length == 0;
    };

    //Return the size of the queue
    this.size = () => {
      return items.length;
    };

    //Print the queue
    this.print = () => {
      console.log(items.toString());
    };
  };
})();

//  Queue using ES6.
class Queue {
  constructor() {
    this.items = [];
  }

  //Add a new element in queue
  enqueue = (elm) => {
    this.items.push(elm);
  }

  //Remove element from the queue
  dequeue = () => {
    return this.items.shift();
  };

  //Return the first element from the queue
  front = () => {
    return this.items[0];
  };

  //Return the last element from the queue
  rear = () => {
    return this.items[this.items.length - 1];
  };

  //Check if queue is empty
  isEmpty = () => {
    return this.items.length == 0;
  };

  //Return the size of the queue
  size = () => {
    return this.items.length;
  };

  //Print the queue
  print = () => {
    console.log(this.items.toString());
  };

}


/** 
 * 跨浏览器事件处理程序
 */

var EventUtil = {
  //   兼容 事件处理程序
  addHandler: function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  },
  removeHandler: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
    }
  },
  //   兼容 DOM和IE 事件对象
  getEvent: function (event) {
    return event ? event : window.event;
  },
  getTarget: function (event) {
    return event.target || event.srcElement;
  },
  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  //   IE 不支持捕获， cancelBubble默认false  true/禁冒泡
  stopPropagation: function (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  }
};


/** 
 * 获取鼠标位置
 */

var div = document.getElementById('TZA4S');
div.addEventListener('click', function (event) {
  console.log(event.clientX + ',' + event.clientY)
}, false);



// observer.js
class Observer {
  constructor(data) {
    this.observe(data);
  }
  observe(data) {
    // 如果没有数据或者不是个对象，就直接return
    if (!data || typeof data !== 'object') return;
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
      this.observe(data[key]); // 深度递归劫持
    });
  }
  defineReactive(obj, key, value) {
    let _this = this;
    let dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 添加订阅
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set(newValue) {
        if (newValue !== value) {
          // 当我们給其设置一个新的值的时候，也可能是个对象，这个对象也需要劫持
          _this.observe(newValue); // 如果是新的对象就继续劫持
          value = newValue;
          dep.notify(); // 任意的值发生变，通知所有人
          return newValue;
        }
      }
    });
  }
}

// 就是一个数组， 把方法放在数组里，一调用的时候，就咔咔循环执行。就这样
class Dep {
  constructor() {
    this.subs = []; // 订阅的数组
  }
  // 添加订阅
  addSub(watcher) {
    this.subs.push(watcher);
  }
  // 遍历执行
  notify() {
    console.log(this.subs);
    this.subs.forEach(watcher => {
      return watcher.update();
    });
  }
}


// compile.js
class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    if (this.el) {
      // 1. 先把真实的DOM移入到内存中 fragment
      let fragment = this.nodeToFragment(this.el);
      // 2. 编译 => 从fragment中提取想要的元素v-model和文本节点{{}}
      this.compile(fragment);
      // 3. 把编译好的fragment在塞回到页面中区
      this.el.appendChild(fragment);
    }
  }
  /**
   * 核心方法
   * nodeToFragment：需要将el中的节点内容全部放入内存
   * compile：编译fragment
   * compileElement：编译节点 带有v-model属性的
   * compileText：编译文本 带有{{}}的
   */
  nodeToFragment(el) {
    let fragment = document.createDocumentFragment();
    let firstChild;
    while ((firstChild = el.firstChild)) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }
  compile(fragment) {
    let childNodes = fragment.childNodes; // 拿到的第一层子节点
    Array.from(childNodes).forEach(node => {
      if (this.isElementNode(node)) {
        // 判别是否是元素节点
        this.compileElement(node); // 取出 v- 开头的元素, 并把数据渲染到页面中
        this.compile(node); // 递归节点childNodes
      } else {
        // 编译文本
        this.compileText(node);
      }
    });
  }
  compileElement(node) {
    let attrs = node.attributes; // 取出当前节点的属性
    Array.from(attrs).forEach(attr => {
      // 判断属性名是不是包含v-
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        // 是否为v-开头
        let expr = attr.value;
        let [, type] = attrName.split('-'); // 语法糖，type='model'
        CompileUtil[type](node, this.vm, expr); // 找到对应的处理函数
      }
    });
  }
  compileText(node) {
    let expr = node.textContent;
    let reg = /\{\{([^}]+)\}\}/g; // {{a}} {{b}} {{c}}
    if (reg.test(expr)) {
      CompileUtil['text'](node, this.vm, expr);
    }
  }
  isElementNode(node) {
    return node.nodeType === 1;
  }
  isDirective(name) {
    return name.includes('v-');
  }
}

CompileUtil = {
  getVal(vm, expr) {
    expr = expr.split('.'); // [a,b,c,d,e,f]
    return expr.reduce((prev, next) => {
      return prev[next];
    }, vm.$data);
  },
  getTextVal(vm, expr) {
    return expr.replace(/\{\{([^]+)\}\}/g, (...arguments) => {
      return this.getVal(vm, arguments[1]);
    });
  },
  // 文本处理
  text(node, vm, expr) {
    let updateFn = this.updater['textUpdater'];
    let value = this.getTextVal(vm, expr);
    // {{ntschsen}} {{message.a}} {{message.b}} 获取大括号内的值
    expr.replace(/\{\{([^]+)\}\}/g, (...arguments) => {
      // 添加订阅， arguments[1] 获取内容地址 message.a
      new Watcher(vm, arguments[1], newValue => {
        // 如果数据变化了，文本节点需要重新获取依赖的数据，
        updateFn && updateFn(node, this.getTextVal(vm, expr));
      });
    });
    updateFn && updateFn(node, value);
  },
  // 输入框处理
  model(node, vm, expr) {
    let updateFn = this.updater['modelUpdater'];
    // 添加订阅
    new Watcher(vm, expr, newValue => {
      // this.getVal(vm, expr) 获取最新的值
      updateFn && updateFn(node, this.getVal(vm, expr));
    });
    node.addEventListener('input', e => {
      let newValue = e.target.value;
      this.setValue(vm, expr, newValue);
    });
    updateFn && updateFn(node, this.getVal(vm, expr));
  },
  // 设置input值
  setValue(vm, expr, value) {
    expr = expr.split('.');
    return expr.reduce((prev, next, currentIndex) => {
      if (currentIndex === expr.length - 1) {
        return (prev[next] = value);
      }
      return prev[next];
    }, vm.$data);
  },
  updater: {
    textUpdater(node, value) {
      // 文本更新
      node.textContent = value;
    },
    modelUpdater(node, value) {
      // 输入框更新
      node.value = value;
    }
  }
};


/** 
 * 创建全平台兼容的XMLHttpRequest对象
 */

function getXHR() {
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXobject) {
    try {
      xhr = new ActiveXobject("MSxml2.XMLHTTP");
    } catch (e) {
      try {
        xhr = new ActiveXobject("Microsoft.XMLHTTP");
      } catch (error) {
        console.log("Your browser not support ajax");
      }
    }
  }
  return xhr;
}

/**
 * 检测输入文本框的黏贴值,不是数字就屏蔽按键
 * 
 */
EventUtil.addHandler(textbox, "paste", function (event) {
  event = EventUtil.getEvent(event);
  var text = EventUtil.getClipboardText(event);
  if (!/^\d*$/.text(text)) {
    EventUtil.preventDefault(event);
  }
});

/**
 * 提供一个 EventUtil 对象, 可以用这个对象来处理浏览期间的差异： 
 * 
 */

var EventUtil = {
  addHandler: function (element, type, handler) { // 该方法接受 3 个参数：要操作的元素，事件名称和事件处理程序函数   
    if (element.addEventListener) { // 检查传入的元素是否存在 DOM2 级方法   
      element.addEventListener(type, handler, false); // 若存在，则使用该方法   
    } else if (element.addEvent) { // 如果存在的是 IE 的方法   
      element.attachEvent("on" + type, handler); // 则使用 IE 的方法，注意，这里的事件类型必须加上 "on" 前缀。   
    } else { // 最后一种可能是使用 DOM0 级   
      element["on" + type] = hander;
    }
  },

  removeHandler: function (element, type, handler) { // 该方法是删除之前添加的事件处理程序   
    if (element.removeEventListener) { // 检查传入的元素是否存在 DOM2 级方法   
      element.removeEventListener(type, handler, false); // 若存在，则使用该方法   
    } else if (element.detachEvent) { // 如果存在的是 IE 的方法   
      element.detachEvent("on" + type, handler); // 则使用 IE 的方法，注意，这里的事件类型必须加上 "on" 前缀。   
    } else { // 最后一种可能是使用 DOM0 及方法 (在现代浏览器中，应该不会执行这里的代码)   
      element["on" + type] = null;
    }
  },

  getClipboardText: function (event) { // 获取剪切板的值
    var clipboardDtat = (event.clipboardData || window.clipboardData);
    return clipboardDtat.getData("text");
  },

  setClipboardText: function (event, value) {
    if (event.clipboardData) { // 设置剪切板的值
      return event.clipboardData.setData("text/application", value);
    } else if (window.clipboardData) {
      return window.clipboardData.setData("text", value);
    }
  }
};

/**
 * 插入sort
 */
function insertSort(arr) {
  var len = arr.length;
  var preIndex, current;
  for (i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}

/**
 * Promise 实现 ajax
 */
var getJSON = function (url) {
  var client = new XMLHttpRequest();
  client.open("GET", url, true);
  client.responseType = "json";
  client.onreadystatechange = handler;
  client.setRequestHeader("Accept", "application");
  client.send();

  var handler = function () {
    if (readyState !== 4) {
      return;
    }
    if (status == 200) {
      reslove(this.response);
    } else {
      reject(new Error(this.statusText));
    }
  };
};
getJSON("/json.json").then(function (json) {
  console.log(json);
}, function (error) {
  console.error(error);
});

/*
快排
*/ 
function quickSort(arr, left, right) {
  var left = typeof left == "number" ? left : 0,
      right = typeof right == 'number' ? right : arr.length-1,
      partitionIndex;
  function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  function sort(arr, left, right) {
    if (left > right) {
      return;
    }
    partitionIndex = partition(arr, left, right);
    sort(arr, left, partitionIndex-1);
    sort(arr, partitionIndex+1, right);
  }
  function partition(arr, left, right) {
    var pivot = left,
        index = pivot + 1;
    for (i=index; i<=right; i++) {
      if (arr[i] < arr[pivot]) {
        swap(arr, i, index);
        index++;
      }
    }
    swap(arr, pivot, index-1);
    return index-1;

  }
  sort(arr, 0, arr.length-1)
  return arr;
}



function getResponseSize(url) {
  return fetch(url).then(response => {
    const reader = response.body.getReader();
    let total = 0;

    return reader.read().then(function processResult(result) {
      if (result.done) return total;

      const value = result.value;
      total += value.length;
      console.log('Received chunk', value);

      return reader.read().then(processResult);
    })
  });
}
//-----------------------------------------------------------------------------------------------------------------------------------
// 0-1背包 动态规划
// import numpy as np

// def solve(vlist,wlist,totalWeight,totalLength):
//     resArr = np.zeros((totalLength+1,totalWeight+1),dtype=np.int32)
//     for i in range(1,totalLength+1):
//         for j in range(1,totalWeight+1):
//             if wlist[i] <= j:
//                 resArr[i,j] = max(resArr[i-1,j-wlist[i]]+vlist[i],resArr[i-1,j])
//             else:
//                 resArr[i,j] = resArr[i-1,j]
//     return resArr[-1,-1]

// if __name__ == '__main__':
//     v = [0,60,100,120]
//     w = [0,10,20,30]
//     weight = 50
//     n = 3
//     result = solve(v,w,weight,n)
//     print(result)

//-----------------------------------------------------------------------------------------------------------------------------------
// 0-1背包 分支限界

//-----------------------------------------------------------------------------------------------------------------------------------
// 0-1背包 回溯法

// 初始化解空间树的代码如下：
// //节点个数为2的n+1次方-1
// size_t pNodeSize = 1;
// for(size_t i = 1; i <= n+1; ++i)
//     pNodeSize *= 2;
// pNodeSize--;

// //根节点的索引为1,权值为0
// int *pTree = new int[pNodeSize+1];
// pTree[1] = 0;

// for(size_t pHeight = 1; pHeight <= n; ++pHeight)
// {
//     //高度为pHeight的第一个节点的索引为2的pHeight次方
//     size_t pStartNode = 1;
//     for(size_t i = 1; i <= pHeight; ++i)
//         pStartNode *= 2;

//     //高度为pHeight的最后一个节点的索引为pStartNode * 2 - 1
//     for(size_t i = pStartNode; i < pStartNode * 2; i += 2)
//     {
//         //高度为pHeight表示的就是第pHeight个物品，重量即为Weight[pHeight]
//         pTree[i] = Weight[pHeight]; //左孩子
//         pTree[i+1] = 0; //右孩子
//     }
// }

// 添加全局变量
// int n; //物品个数
// int Capacity; //背包容量
// int *Weight; //Weight[i]表示物品i的重量
// int *Profit; //Profit[i]表示物品i的价值量
// int *pTree; //解空间树，pTree[i]表示节点i的重量，同时又可以用于判断是否装入物品i
// int pNodeSize; //节点数量
// int pLastNode; //最优解的叶子结点索引
// int pMaxProfit; //最优解的值，初始为0
// int pHeight; //当前高度，初始为0，始终表示当前结点的高度
// int pCurrentProfit; //当前价值量，初始为0
// int pCurrentWeight; //当前加入背包的总重量，初始为0

// 创建递归函数
// void Backpack(int pCurrentNode)
// {   
//     //到达叶子节点，更新最优解，记录最优解的叶子结点
//     if(pCurrentNode * 2 > pNodeSize)
//     {
//         if(pCurrentProfit > pMaxProfit)
//         {
//             pMaxProfit = pCurrentProfit;
//             pLastNode = pCurrentNode;
//         }
//         return;
//     }
//     //高度加一，此时表示的是下一个物品（pCurrentNode左孩子和右孩子表示的物品）
//     pHeight++; 

//     //如果pCurrentNode表示物品i, 则加一后的pHeight表示物品i+1，pRemainingProfit应该把物品i+1的价值减掉
//     pRemainingProfit -= Profit[pHeight];

//     //如果当前背包装入的重量加上下一个物品的重量仍然小于等于背包容量
//     //则可以将下一个物品加入背包
//     if(pCurrentWeight + Weight[pHeight] <= Capacity)
//     {
//         //假设pCurrentNode表示的是物品i,则此时加上的是物品i+1的重量和价值
//         //因为物品i的重量和价值已经在上一层递归中加上了
//         pCurrentWeight += Weight[pHeight];
//         pCurrentProfit += Profit[pHeight];
//         Backpack(pCurrentNode * 2); //跳转到左孩子，表示将物品i+1(pHeight)装入背包
//         //回溯到这个节点后，物品i+1装入背包的情况已经考虑完，需要将物品i+1的重量和价值减去
//         //开始考虑物品i+1没有装入背包的情况
//         pCurrentWeight -= Weight[pHeight];
//         pCurrentProfit -= Profit[pHeight];
//     }

//     //跳转到右孩子节点，表示物品i+1没有装入背包(i + 1 == pHeight)
//     if(pRemainingProfit + pCurrentProfit > pMaxProfit)
//         Backpack(pCurrentNode * 2 + 1);

//     //返回后，回溯到这个节点，物品i+1没有装入的情况也已经考虑完，需要向上回溯，高度减一，pRemainingProfit加回
//     pRemainingProfit += Profit[pHeight];
//     pHeight--;
// }


/**
 * JS打乱数组
*/
function getArrRandomly(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        var randomIndex = Math.floor(Math.random()*(len-i));//这里一定要注意，后面不管是（i+1）还是（len-i），它们是时变的。
        var itemAtIndex = arr[randomIndex];
        arr[randomIndex] = arr[i];
        arr[i] = itemAtIndex;
    }
    return arr;
}


/**
 * JS bind 实现
*/
if (!Function.prototype.bind) {
    Function.prototype.bind = function () {
        var self = this,                        // 保存原函数
            context = [].shift.call(arguments), // 保存需要绑定的this上下文
            args = [].slice.call(arguments);    // 剩余的参数转为数组
        return function () {                    // 返回一个新函数
            self.apply(context,[].concat.call(args, [].slice.call(arguments)));
        }
    }
}

Function.prototype.bind = function (...arg) {
    var self = this;
		var newArr = [...arg];         // 保存原函数
    var context = newArr.shift(); // 保存需要绑定的this上下文
    return function (...arg2) {
				var arr = [...newArr];  
				Array.prototype.push.apply(arr,arg2)
				self.apply(context,arr);
    }
}

/**
 *  懒加载
 * 
 * offsetTop 返回当前元素相对于其 offsetParent 元素的顶部的距离
 * window.innerHeight 浏览器窗口的视口（viewport）高度（以像素为单位）；如果有水平滚动条，也包括滚动条高度。
 * window.pageYOffset 只读属性 是 scrollY 的别名。
 * scrollY 返回文档在垂直方向已滚动的像素值。
 */
let lazyImages = [...document.querySelectorAll('.lazy-image')]
let inAdvance = 300 // 自定义一个高度，当距离300px到达图片时加载

function lazyLoad() {
    lazyImages.forEach(image => {
        if (image.offsetTop < window.innerHeight + window.pageYOffset + inAdvance) { // 距离xxpx时加载图片
            image.src = image.dataset.src
            image.onload = () => image.classList.add('loaded')
        }
    })

    // if all loaded removeEventListener
}

lazyLoad()

window.addEventListener('scroll', _.throttle(lazyLoad, 16)) // 用到了lodash的节流函数
window.addEventListener('resize', _.throttle(lazyLoad, 16))


/**
 * js 实现 promise
*/
class PromiseClone {
	constructor (process) {
		this.status = 'pending';
		this.msg = '';
		process(this.resolve.bind(this), this.reject.bind(this));
		return this;
	}
	resolve (val) {
		this.status = 'fulfilled';
		this.msg = val;
	}
	reject (err) {
		this.status = 'rejected';
		this.msg = err
	}
	then (fufilled, reject) {
		if (this.status === 'fulfilled') {
			fulfilled(this.msg);
		}
		if (this.status === 'rejected') {
			reject(this.msg);
		}
	}
}

/**
 * 发布订阅模式
*/
const event = {
	clientList: [],
	listen: function(key, fn) {
		if (this.clientListen[key]) {
			this.clientList[key] = []
		}
		this.clientList[key].push(fn)
	},
	trigger: function() {
		const key = Array.prototype.shift.call(arguments)
		const fns = this.clientList[key]
		if ( !fns || fns.length === 0 ) {
			return false
		}
		for (let i = 0, fn; fn = fns[i++];) {
			fn.apply(this, arguments)
		}
	},
	remove: function(key, fn) {
		const fns = this.clientList[key]
		if (!fns) {
			return false
		}
		if (!fn) {
			fns && (fns.length = 0)
		} else {
			for (let l = fns.length - 1; l>=0; l--) {
				const _fn = fns[l]
				if (_fn === fn) {
					fns.splice(l, 1)
				}
			}
		}
	}
}

const installEvent = (obj) => {
	for (let i in event) {
		obj[i] = event[i]
	}
}

/**
 *  JSONP
*/
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://www.domain-com:8080/login?user=admin&callback=onBack'
function onBack(res) {
	alert(JSON.stringify(res));
}

/**
 * 获取 url 参数
*/

export function getQueryString(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = window.location.search.substr(1).match(reg); 
  if (r != null) 
    return decodeURI(r[2]); 
  return null;
}
// 或
export function getQueryStringByStr(data) {
  const url = data;
  const theRequest = {};
  if (url.indexOf('?') !== -1) {
      const str = url.substr(1);
      const strs = str.split('&');
      for (let i = 0; i < strs.length; i += 1) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
      }
  }
  return theRequest;
}