import { Button, Modal, Input, Avatar, Dropdown, Badge } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined, BellOutlined, SearchOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons'
import { useContext, useState } from "react";
import { Context } from "../context/Context";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { PATH } from './../components'
import toast from "react-hot-toast";

const Header = () => {
  const [LogOutModal, setLogOutModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { collepsed, setCollepsed } = useContext(Context);
  const location = useLocation();

  const toggleCollapsed = () => {
    setCollepsed(!collepsed);
  };
  const [, , removeCookie] = useCookies(['token']);
  const navigate = useNavigate()

  const LogOut = () => {
    setLoading(true)
    setTimeout(() => {
      removeCookie('token', { path: '/' });
      navigate(PATH.login);
      setLoading(false)
      setLogOutModal(false)
      toast.success("Muvaffaqiyatli chiqildi")
    }, 1000)
  }

  const getPageTitle = () => {
    const path = location.pathname
    if (path.includes('/stacks')) return 'Stacks'
    if (path.includes('/groups')) return 'Guruhlar'
    if (path.includes('/teachers')) return "O'qituvchilar"
    if (path.includes('/students')) return "O'quvchilar"
    if (path.includes('/rooms')) return 'Xonalar'
    return 'Dashboard'
  }

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profil',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Sozlamalar',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Chiqish',
      danger: true,
      onClick: () => setLogOutModal(true),
    },
  ]

  return (
    <div className="bg-header border-b border-border flex items-center justify-between px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Button
          type="text"
          size="large"
          onClick={toggleCollapsed}
          className="text-muted-foreground hover:text-foreground hover:bg-secondary border-none"
          icon={collepsed ? <MenuUnfoldOutlined style={{ fontSize: '18px' }} /> : <MenuFoldOutlined style={{ fontSize: '18px' }} />}
        />
        <div className="hidden md:block">
          <h1 className="text-xl font-semibold text-foreground">{getPageTitle()}</h1>
          <p className="text-xs text-muted-foreground">ERP boshqaruv paneli</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden lg:block">
          <Input
            prefix={<SearchOutlined className="text-muted-foreground" />}
            placeholder="Qidirish..."
            className="w-64"
            size="large"
          />
        </div>

        {/* Notifications */}
        <Badge count={3} size="small">
          <Button
            type="text"
            size="large"
            className="text-muted-foreground hover:text-foreground hover:bg-secondary border-none"
            icon={<BellOutlined style={{ fontSize: '18px' }} />}
          />
        </Badge>

        {/* User Menu */}
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
          <div className="flex items-center gap-3 cursor-pointer hover:bg-secondary rounded-lg px-3 py-2 transition-colors">
            <Avatar
              size={36}
              className="bg-gradient-to-br from-primary to-blue-400"
              icon={<UserOutlined />}
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground leading-tight">Admin</p>
              <p className="text-xs text-muted-foreground">admin@erp.uz</p>
            </div>
          </div>
        </Dropdown>
      </div>

      <Modal
        title="Chiqishni tasdiqlang"
        open={LogOutModal}
        confirmLoading={loading}
        onOk={LogOut}
        onCancel={() => setLogOutModal(false)}
        okText="Ha, chiqish"
        cancelText="Bekor qilish"
        okButtonProps={{ danger: true }}
      >
        <p className="text-muted-foreground">Haqiqatan ham tizimdan chiqmoqchimisiz?</p>
      </Modal>
    </div>
  )
}

export default Header
