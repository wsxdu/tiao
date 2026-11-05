# 跳舞的线 · 小米手环9

Xiaomi Vela 快应用（RPK），包名 `com.dancingline.band9`，版本 1.0.0。

## 下载

见 Release 中的 `dancing-line-band9.rpk`。

## 安装

手环开启开发者模式，用 aiot-toolkit 安装：

```
adb push dancing-line-band9.rpk /data/quickapp/app/com.dancingline.band9.rpk
adb shell pm install /data/quickapp/app/com.dancingline.band9.rpk
```

## 内容

- 主界面：LOGO、关于、设置，右滑进入关卡
- 8 个关卡卡片，未解锁显示锁
- 伪 3D 路面、弯点点击转向、失败/过关判定
- 存档：解锁进度、星级、成绩
