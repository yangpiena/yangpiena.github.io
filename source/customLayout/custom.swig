{% if theme.cursor_effect %}
  {% if theme.cursor_effect.type == "fireworks" %}
    <script src="/js/custom/fireworks.js"></script>
  {% elseif theme.cursor_effect.type == "explosion" %}
    <canvas class="fireworks" style="position: fixed;left: 0;top: 0;z-index: 1; pointer-events: none;" ></canvas>
    <script src="//cdn.bootcss.com/animejs/2.2.0/anime.min.js"></script>
    <script src="/js/custom/explosion.min.js"></script>
  {% elseif theme.cursor_effect.type == "love" %}
    <script src="/js/custom/love.min.js"></script>
  {% elseif theme.cursor_effect.type == "text" %}
    <script src="/js/custom/text.js"></script>
  {% endif %}
{% endif %}