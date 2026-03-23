import { HomeOutlined, PieChartOutlined, UserAddOutlined, UsergroupAddOutlined, UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Menu, Badge } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { PATH } from '../components';
import { useContext } from 'react';
import { Context } from '../context/Context';

const items = [
  { key: 'stacks', icon: <AppstoreOutlined style={{ fontSize: '18px' }} />, label: <Link to={PATH.stacks}>Stacks</Link> },
  { key: 'groups', icon: <UsergroupAddOutlined style={{ fontSize: '18px' }} />, label: <Link to={PATH.groups}>Guruhlar</Link> },
  { key: 'teachers', icon: <UserOutlined style={{ fontSize: '18px' }} />, label: <Link to={PATH.teachers}>O'qituvchilar</Link> },
  { key: 'students', icon: <UserAddOutlined style={{ fontSize: '18px' }} />, label: <Link to={PATH.students}>O'quvchilar</Link> },
  { key: 'rooms', icon: <HomeOutlined style={{ fontSize: '18px' }} />, label: <Link to={PATH.rooms}>Xonalar</Link> },
];

const SiteBar = () => {
  const { collepsed } = useContext(Context)
  const location = useLocation()
  
  const getSelectedKey = () => {
    const path = location.pathname
    if (path.includes('/stacks')) return 'stacks'
    if (path.includes('/groups')) return 'groups'
    if (path.includes('/teachers')) return 'teachers'
    if (path.includes('/students')) return 'students'
    if (path.includes('/rooms')) return 'rooms'
    return 'stacks'
  }

  return (
    <div className={`${collepsed ? "w-[80px]" : "w-[260px]"} duration-300 h-screen bg-sidebar border-r border-border flex flex-col`}>
      {/* Logo Section */}
      <div className={`py-6 flex ${collepsed ? "justify-center px-2" : "px-6"} items-center gap-3 border-b border-border`}>
        <div className='w-10 h-10 bg-gradient-to-br from-primary to-blue-400 rounded-xl flex items-center justify-center shadow-lg'>
          <span className='text-lg font-bold text-white'>E</span>
        </div>
        {!collepsed && (
          <div className='flex flex-col'>
            <h1 className='font-bold text-foreground text-lg tracking-tight'>EduERP</h1>
            <span className='text-xs text-muted-foreground'>Boshqaruv tizimi</span>
          </div>
        )}
      </div>
      
      {/* Navigation Section */}
      <div className='flex-1 py-4'>
        {!collepsed && (
          <div className='px-6 mb-3'>
            <span className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>Asosiy</span>
          </div>
        )}
        <Menu
          className='border-none bg-transparent px-2'
          selectedKeys={[getSelectedKey()]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collepsed}
          items={items}
        />
      </div>
      
      {/* Footer Section */}
      {!collepsed && (
        <div className='p-4 border-t border-border'>
          <div className='bg-secondary rounded-xl p-4'>
            <div className='flex items-center gap-3 mb-2'>
              <div className='w-8 h-8 bg-gradient-to-br from-accent to-green-400 rounded-lg flex items-center justify-center'>
                <span className='text-xs font-bold text-white'>Pro</span>
              </div>
              <div>
                <p className='text-sm font-medium text-foreground'>Premium</p>
                <p className='text-xs text-muted-foreground'>Yangilash</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteBar;
