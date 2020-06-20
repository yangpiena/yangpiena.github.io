{% if theme.cursor_effect %}
  {% if theme.cursor_effect.type == "fireworks" %}
    <script type="text/javascript" src="/js/ypn.js/fireworks.js"></script>
  {% elseif theme.cursor_effect.type == "explosion" %}
    <canvas class="fireworks" style="position: fixed;left: 0;top: 0;z-index: 1; pointer-events: none;" ></canvas>
    <script src="//cdn.bootcss.com/animejs/2.2.0/anime.min.js"></script>
    <script type="text/javascript" src="/js/ypn.js/explosion.min.js"></script>
  {% elseif theme.cursor_effect.type == "love" %}
    <script type="text/javascript" src="/js/ypn.js/love.min.js"></script>
  {% elseif theme.cursor_effect.type == "text" %}
    <script type="text/javascript" src="/js/ypn.js/text.js"></script>
  {% endif %}
{% endif %}

<!-- 动态线条背景 -->
<script type="text/javascript" color="235,178,178" opacity='0.7' zIndex="-2" count="100" src="//cdn.bootcss.com/canvas-nest.js/1.0.0/canvas-nest.min.js"></script>

<!--2017-10-06 YPN Add 添加输入框特效。 -->
<script src="/js/ypn.js/activate-power-mode.js"></script>
<script>
  POWERMODE.colorful = true;  // 控制开启/开启礼花特效  
  POWERMODE.shake    = false; // 控制开启/关闭屏幕震动特效  
  document.body.addEventListener('input', POWERMODE);
</script>

<!-- 崩溃欺骗 -->
<script type="text/javascript" src="/js/ypn.js/crash-cheat.js"></script>

<!-- 收藏页搜索按钮动作 -->
<script type="text/javascript" src="/js/ypn.js/searchButton.js"></script>

<!-- 一言 -->
<script type="text/javascript" src="/js/ypn.js/yiYanJingDianYuJu.js"></script>

<!-- 图片点击放大效果 -->
<script type="text/javascript" src="/js/ypn.js/image.js"></script>
