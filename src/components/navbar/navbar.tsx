import { Layout, Menu } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import { MenuInfo, MenuItemType } from 'rc-menu/lib/interface';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {

  const [selectedMenu, setSelectedMenu] = useState<string[]>([]);
  const navigate = useNavigate()

  const items: ItemType<MenuItemType>[] = [{
    key: "0",
    label: 'Home',
  }, {
    key: "1",
    label: 'FastMath',
  }, {
    key: "2",
    label: 'Figures',
  }]

  const onClick = (info: MenuInfo) => {
    switch (info.key) {
      case items[0]?.key:
        navigate("/");
        break;
      case items[1]?.key:
        navigate("/fastmath");
        break;
      case items[2]?.key:
        navigate("/figures");
        break;
    }
    setSelectedMenu([info.key]);
  }

  return (<Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={selectedMenu}
      onClick={onClick}
      items={items}
      style={{ flex: 1, minWidth: 0 }}
    />
  </Layout.Header>);
}