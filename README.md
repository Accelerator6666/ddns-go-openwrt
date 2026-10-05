# DDNS-GO for OpenWrt x86_64

为 OpenWrt x86_64 提供 DDNS-GO 核心包和 LuCI 管理入口。

## 当前版本

- DDNS-GO: 6.17.7
- OpenWrt 24.10.5 x86/64: IPK
- OpenWrt 25.12.5 x86/64: APK

## Packages

### ddns-go

- 使用 DDNS-GO 官方 Linux x86_64 Release 二进制
- OpenWrt procd 服务
- UCI 配置
- 默认 Web 端口 `9876`

### luci-app-ddns-go

- LuCI：服务 → DDNS-GO
- 服务状态显示
- 启用/禁用
- 监听地址
- 更新间隔
- 自定义 DNS
- TLS 校验选项
- 一键打开 DDNS-GO Web 管理界面

## 安装

OpenWrt 24.10.x / opkg：

```sh
opkg install ./ddns-go_*.ipk
opkg install ./luci-app-ddns-go_*.ipk
```

OpenWrt 25.12.x / apk：

```sh
apk add --allow-untrusted ./ddns-go-*.apk
apk add --allow-untrusted ./luci-app-ddns-go-*.apk
```

安装后：

```sh
/etc/init.d/ddns-go enable
/etc/init.d/ddns-go restart
```

默认 Web 管理地址：

```text
http://OPENWRT-IP:9876/
```

## 构建

GitHub Actions 使用：

- OpenWrt 24.10.5 x86/64 SDK → IPK
- OpenWrt 25.12.5 x86/64 SDK → APK

推送 `v*` Tag 时会创建 GitHub Release，并附带 APK、IPK 与 `SHA256SUMS`。

## Upstream

- DDNS-GO: https://github.com/jeessy2/ddns-go

本仓库不是 DDNS-GO 官方项目。DDNS-GO 本体遵循其上游许可证。
