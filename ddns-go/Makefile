include $(TOPDIR)/rules.mk

PKG_NAME:=ddns-go
PKG_VERSION:=6.17.7
PKG_RELEASE:=1

PKG_SOURCE:=ddns-go_$(PKG_VERSION)_linux_x86_64.tar.gz
PKG_SOURCE_URL:=https://github.com/jeessy2/ddns-go/releases/download/v$(PKG_VERSION)
PKG_HASH:=b1f88532c60f4e94f973eaf4d56b92a030f4c97fb98f146f8c591d55ad6ec118

PKG_LICENSE:=MIT
PKG_MAINTAINER:=Accelerator6666

include $(INCLUDE_DIR)/package.mk

define Package/ddns-go
  SECTION:=net
  CATEGORY:=Network
  SUBMENU:=IP Addresses and Names
  TITLE:=DDNS-GO dynamic DNS client
  URL:=https://github.com/jeessy2/ddns-go
  DEPENDS:=@TARGET_x86_64 +ca-bundle
endef

define Package/ddns-go/description
 DDNS-GO is a dynamic DNS client supporting IPv4 and IPv6.
 This OpenWrt package uses the official upstream Linux x86_64 release binary.
endef

define Package/ddns-go/conffiles
/etc/config/ddns-go
/etc/ddns-go/ddns-go-config.yaml
endef

define Build/Prepare
	mkdir -p $(PKG_BUILD_DIR)
	$(HOST_TAR) -C $(PKG_BUILD_DIR) -xzf $(DL_DIR)/$(PKG_SOURCE)
endef

define Build/Compile
endef

define Package/ddns-go/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/ddns-go $(1)/usr/bin/ddns-go
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/ddns-go.init $(1)/etc/init.d/ddns-go
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/ddns-go.config $(1)/etc/config/ddns-go
	$(INSTALL_DIR) $(1)/etc/ddns-go
endef

$(eval $(call BuildPackage,ddns-go))
