import {  HomeOutlined, PieChartOutlined, UserAddOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { PATH } from '../components';
import { useContext } from 'react';
import { Context } from '../context/Context';


const items = [
  { key: '1', icon: <PieChartOutlined />, label: <Link to={PATH.stacks}>Stacks</Link>},
  { key: '2', icon: <UsergroupAddOutlined />, label: <Link to={PATH.groups}>Groups</Link> },
  { key: '3', icon: <UserOutlined />, label: <Link to={PATH.teachers}>Teachers</Link> },
  { key: '4', icon: <UserAddOutlined />, label: <Link to={PATH.students}>Students</Link> },
  { key: '5', icon: <HomeOutlined />, label: <Link to={PATH.rooms}>Rooms</Link> },
];

const SiteBar= () => {
   const {collepsed} = useContext(Context)
  return (
    <div className={`${collepsed ? "w-[5.5%]" : "w-[22%]"} duration-300 h-screen bg-[#031529]`}>
      <div className={`text-white border-b border-white py-[25px] flex ${collepsed ? "justify-center" : "pl-4"} items-center gap-2`}>
        <div className='flex items-center'>
          <span className='text-[20px] text-slate-300'>E</span>
          <span className='text-[20px] text-blue-400'>R</span>
          <span className='text-[20px] text-yellow-400'>P</span>
        </div>
        {!collepsed && <h1 className='font-bold'>System</h1>}
      </div>
      <Menu
        className='w-full'
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collepsed}
        items={items}
      />
    </div>
  );
};

export default SiteBar;