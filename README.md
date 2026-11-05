# 跳舞的线 · 小米手环9

Xiaomi Vela 快应用，包名 `com.dancingline.band9`，运行于小米手环 9（Xiaomi Vela）。

## 下载安装包

Release 中的 `dancing-line-band9.rpk`：
https://github.com/wsxdu/tiao/releases/download/v1.0.0/dancing-line-band9.rpk

## 安装

手环开启开发者模式后用 aiot-toolkit：

```
adb push dancing-line-band9.rpk /data/quickapp/app/com.dancingline.band9.rpk
adb shell pm install /data/quickapp/app/com.dancingline.band9.rpk
```

## 构建

```
npm i
npm run release   # 产物 dist/*.rpk
```

## 源码结构

```
src/
  manifest.json          应用配置（包名、页面路由、能力声明）
  app.ux                 应用入口
  config-watch.json      手环设备配置
  common/
    levels.js            8 个关卡的路径数据（cells 格子 + segs 段）
    save.js              存档读写（unlocked / stars / best）
    logo.png             应用图标（192x192）
  pages/
    index/index.ux       主界面（LOGO、关于、设置、右滑进关卡）
    levels/levels.ux     关卡选择卡片（封面代码绘制、星级、锁定态）
    game/game.ux         伪 3D 游戏引擎、点击转向判定、过关/失败、存档
    about/about.ux       关于页
    settings/settings.ux 设置页（清空数据、退出）
```

## 实现要点

- Vela 无 canvas / 3D transform，用伪 3D 投影：相机在玩家后方，按远景到近景顺序绘制 24 个路面方块，每帧更新 left/top/width/height。
- 线自动前进，点击预约转向；接近弯点 0.45 格内吸附并转向；偏离路面超过 1.05 格持续 0.2s 判定失败。
- 关卡为直线段 + 90 度弯点组成的之字形路径，自交已检测排除。
- 存档用 `@system.storage`，key `dl_save_v1`，脏数据自动归一化。
- 所有 UI 图标用 div 代码绘制（圆角、旋转、渐变），仅应用图标为 png。
