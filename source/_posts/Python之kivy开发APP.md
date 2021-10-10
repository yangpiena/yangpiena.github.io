---
title: Python之kivy开发APP
author: 昜丿捺
copyright: true
categories: 技术
timestamp: 1624756228
date: 2021-06-27 09:10:28
authorDesc:
tags:
description: 使用Python开发APP
---
# 安装kivy
```
python -m pip install docutils pygments pypiwin32 kivy.deps.sdl2 kivy.deps.glew
```
```
python -m pip install kivy.deps.gstreamer
```
```
python -m pip install kivy
```
安装kivy官方示例
```
python -m pip install kivy_examples
```
> 如果下载速度慢，请加入代理，使用清华镜像：` -i https://pypi.tuna.tsinghua.edu.cn/simple`


# 验证kivy
1. 创建文件`main.py`
```
import os
import kivy
from kivy.app import App
from kivy.core.text import LabelBase
from kivy.resources import resource_add_path, resource_find
from kivy.uix.label import Label  # 标签控件
from kivy.uix.floatlayout import FloatLayout
from kivy.uix.gridlayout import GridLayout

# 解决中文乱码问题
# 引入资源目录,如 fonts 目录位于项目根目录下，写相对路径(不要写绝对路径)相当于告诉kivy　HarmonyOS_Sans_SC_Regular.ttf 字体位于 fonts 目录中
resource_add_path(os.path.abspath('./fonts'))
# 替换kivy中的默认字体，使用我们的新字体
LabelBase.register('Roboto', 'HarmonyOS_Sans_SC_Regular.ttf')


class Home(GridLayout):
    def __init__(self, **kwargs):
        super(Home, self).__init__(**kwargs)
        pass

    def Go(self):
        print("Go")


class MainApp(App):
    def __init__(self, **kwargs):
        super(MainApp, self).__init__(**kwargs)
        self.title = '昜丿捺'  # 修改窗口标题

    def build(self):
        # return Label(text="Hello World，我是昜丿捺")
        return Home()


if __name__ == '__main__':
    MainApp().run()

```

2. 创建ui文件`main.kv`
```
<Home>:
    padding:20
    spacing:20
    cols:3
    rows:10
    canvas:
        Color:
            rgba:[43,43,43,0]
        Rectangle:
            size:self.size
            pos:self.pos

    col_force_default:True
    col_default_width: 130
    row_default_height: 50

    Label:
        text: 'Hello, 我是首页!'
    TextInput:
    Button:
        text: 'Go'
```

3. 最后，运行`main.py`，出现界面表示kivy安装成功。


# 打包APP
下载官网提供的已配置好环境的虚拟机镜像，在本地安装打开后，进行打包。
```
buildozer init
```
```
buildozer android debug
```

## 支持中文
1. Ubuntu必须部署kivy环境，并且运行python3 main.py 能正常显示中文字符窗口
在Ubuntu安装中文字体
```
 sudo mkdir /usr/share/fonts/ttf
 sudo cp ~/ttf/* /usr/share/fonts/ttf
 cd /usr/share/fonts/ttf
 sudo chmod 744 *
 sudo mkfontscale
 sudo mkfontdir
 sudo fc-cache -f -v
```
2. 配置`buildozer.spec`文件
- 更改title值为app名字，不要过长和空格；
- 更改source.include_exts值，增加ttf类型。

