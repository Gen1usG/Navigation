// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"d6sW":[function(require,module,exports) {
var data = JSON.parse(localStorage.getItem('x')) || [{
  url: 'baidu.com',
  trueUrl: 'https://www.baidu.com'
}, {
  url: 'jquery123.com',
  trueUrl: 'https://www.jquery123.com'
}];

var render = function render() {
  $('.item-list:not(.item-list-increase)').remove();
  data.forEach(function (el, index) {
    var $li = $("<li class='item-list'>\n        <a href=".concat(el.trueUrl, ">\n            <div class=\"item-list-icon\">").concat(el.icon || el.url[0], "</div>\n            <div class=\"item-list-url\">").concat(el.url, "</div>\n            <div class='close'>\n                <svg class=\"icon\" aria-hidden=\"true\">\n                    <use xlink:href=\"#icon-cross\"></use>\n                </svg>\n            </div>\n        </a>\n        </li>")).insertBefore('.item-list-increase'); // 绑定事件的时机在每次渲染的时候，如果不这样新增的元素就没有事件
    // on函数的可选参数

    $li.on('click', '.close', function (el) {
      data.splice(index, 1); // 阻止a标签的跳转

      el.preventDefault();
      render();
    });
  });
};

render();
$('.item-list-increase').on('click', function () {
  var newurl = prompt('请输入新增的网址');

  if (newurl && (newurl.indexOf('https://') !== -1 || newurl.indexOf('http://')) !== -1) {
    var newitem = {
      url: newurl.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''),
      trueUrl: newurl
    };
    data.push(newitem);
    render();
  } else {
    alert('请输入完整网址,包括http或https');
  }
});
$(window).on('keypress', function (el) {
  var key = el.key;
  data.forEach(function (item) {
    if (item.url[0] === key.toLowerCase()) {
      window.open(item.trueUrl);
    }
  });
});

window.onbeforeunload = function () {
  localStorage.setItem('x', JSON.stringify(data));
};
},{}]},{},["d6sW"], null)
//# sourceMappingURL=main.27e97d7b.js.map