var binft = function (r) {
	function t() {
		return b[Math.floor(Math.random() * b.length)]
	}  
	function e() {
		return String.fromCharCode(94 * Math.random() + 33)
	}
	function n(r) {
		for (var n = document.createDocumentFragment(), i = 0; r > i; i++) {
			var l = document.createElement("span");
			l.textContent = e(), l.style.color = t(), n.appendChild(l)
		}
		return n
	}
	function i() {
		//使用固定语句
		//var t = o[c.skillI];
		//使用一言
		var t = v_yiYan;
		c.step ? c.step-- : (c.step = g, c.prefixP < l.length ? (c.prefixP >= 0 && (c.text += l[c.prefixP]), c.prefixP++) : "forward" === c.direction ? c.skillP < t.length ? (c.text += t[c.skillP], c.skillP++) : c.delay ? c.delay-- : (c.direction = "backward", c.delay = a) : c.skillP > 0 ? (c.text = c.text.slice(0, -1), c.skillP--) : (c.skillI = (c.skillI + 1) % o.length, c.direction = "forward")), r.textContent = c.text, r.appendChild(n(c.prefixP < l.length ? Math.min(s, s + c.prefixP) : Math.min(s, t.length - c.skillP))), setTimeout(i, d)
	}
	var l = "",
	o = ["青青陵上柏，磊磊涧中石。", "人生天地间，忽如远行客。","斗酒相娱乐，聊厚不为薄。", "驱车策驽马，游戏宛与洛。","洛中何郁郁，冠带自相索。","长衢罗夹巷，王侯多第宅。","两宫遥相望，双阙百余尺。","极宴娱心意，戚戚何所迫？"].map(function (r) {
		return r + ""
	}),
	//每一语句显示/消失的间隔时间（秒）
	a = 10,
	g = 1,
	s = 5,
	//语句显示/消失完共花费的时间（秒）
	d = 75,
	b = ["rgb(110,64,170)", "rgb(150,61,179)", "rgb(191,60,175)", "rgb(228,65,157)", "rgb(254,75,131)", "rgb(255,94,99)", "rgb(255,120,71)", "rgb(251,150,51)", "rgb(226,183,47)", "rgb(198,214,60)", "rgb(175,240,91)", "rgb(127,246,88)", "rgb(82,246,103)", "rgb(48,239,130)", "rgb(29,223,163)", "rgb(26,199,194)", "rgb(35,171,216)", "rgb(54,140,225)", "rgb(76,110,219)", "rgb(96,84,200)"],
	c = {
		text: "",
		prefixP: -s,
		skillI: 0,
		skillP: 0,
		direction: "forward",
		delay: a,
		step: g
	};
	//YPN Add 2019-03-29 请求获得从7种分类中随机抽取一个句子，并以纯文本格式输出：https://v1.hitokoto.cn/?encode=text
	//https://v1.hitokoto.cn/（从7种分类中随机抽取）
	//https://v1.hitokoto.cn/?c=b （请求获得一个分类是漫画的句子）
	//https://v1.hitokoto.cn/?c=f&encode=text （请求获得一个来自网络的句子，并以纯文本格式输出）
	var v_yiYan = "让我安静一会儿";
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			var v_yiYanJson = eval('(' + xhr.responseText + ')');
			v_yiYan = v_yiYanJson['hitokoto'];
		}
	}
	xhr.open("GET", "https://v1.hitokoto.cn/",true);
	xhr.send();
	i()
};
binft(document.getElementById('lwlhitokoto'));