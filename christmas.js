/**
 * 慕课网特制
 * 圣诞主题效果
 * @type {Object}
 */

/**
 * 中间调用
 */
var Christmas = function() {

  // 播放音乐
  const audio1 = HTML5Audio('./asset/music/scene.mp3');
  audio1.end(function() {
    alert("音乐结束");
  });

  //页面容器元素
  var $pageA = $(".page-a");
  var $pageB = $(".page-b");
  var $pageC = $(".page-c");

  // 观察者
  var observer = new Observer();

  // 切换场景
  let index = 10;

  // A场景页面
  // 展示A场景背景页面
  new pageA($pageA, function() {
      observer.publish("completeA");
  })
  //进入B场景
  observer.subscribe("pageB", function() {

      new pageB($pageB, function() {
          observer.publish("completeB");
      })
  })
  //进入C场景
  observer.subscribe("pageC", function() {
      new pageC()
  })

  //页面A-B场景切换
  observer.subscribe("completeA", function() {
      changePage($pageA, "effect-out", function() {
          observer.publish("pageB");
      })
  })
  //页面B-C场景切换
  observer.subscribe("completeB", function() {
      changePage($pageC, "effect-in", function() {
          observer.publish("pageC");
      })
  })

};  

$(function() {
  $("button").click(function(){
      // 圣诞主题效果，开始
      Christmas()
  })
})

/**
 * 背景音乐
 * @param {[type]} url  [description]
 * @param {[type]} loop [description]
 */
function HTML5Audio(url, loop) {
  var audio = new Audio(url);
  audio.autoplay = true;
  audio.loop = loop || false; //是否循环
  audio.play();
  return {
      end: function(callback) {
          audio.addEventListener('ended', function() {
              callback()
          }, false);
      }
  }
}

/**
 * 切换页面
 * 模拟镜头效果
 * @return {[type]} [description]
 */
function changePage(element, effect, callback) {
  element
      .addClass(effect)
      .one("animationend webkitAnimationEnd", function() {
          callback && callback();
      })
}