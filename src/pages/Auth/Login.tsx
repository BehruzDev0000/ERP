import { KeyOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, Divider, Tabs } from 'antd';
import { instance } from '../../hooks';
import { toast } from "react-hot-toast"
import { useCookies } from "react-cookie"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../components';

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [, setCookie,] = useCookies(['token']);
  const [manualToken, setManualToken] = useState<string>('')
  
  const LoginFn = useMutation({
    mutationFn: (data: { email: string, password: string }) => instance().post("/auth/login", data),
    onSuccess: (res) => {
      toast.success("Successfully signed!")
      setLoading(false)
      setTimeout(() => {
        setCookie("token", res.data.data.tokens.accessToken)
        navigate(PATH.home)
      },1000)
    },
    onError: (err) => {
      toast.error(err.message)
      setLoading(false)
    }
  })
  
  const onFinish = (values: { email: string, password: string }) => {
    setLoading(true)
    LoginFn.mutate(values)
  };

  const handleManualToken = () => {
    if (!manualToken.trim()) {
      toast.error("Token kiriting!")
      return
    }
    setCookie("token", manualToken.trim())
    toast.success("Token saqlandi!")
    setTimeout(() => {
      navigate(PATH.home)
    }, 500)
  }

  return (
    <div className='h-screen bg-slate-900/50 flex items-center justify-center'>
      <div className='bg-white p-5 rounded-xl' style={{ minWidth: 400 }}>
        <Tabs
          defaultActiveKey="login"
          centered
          items={[
            {
              key: 'login',
              label: 'Login',
              children: (
                <Form
                  autoComplete='off'
                  name="login"
                  onFinish={onFinish}
                >
                  <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
                    <Input allowClear size='large' prefix={<UserOutlined className='text-[18px] text-[#c6c6c6]!' />} placeholder="example@gmail.com" />
                  </Form.Item>
                  <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                    <Input.Password size='large' prefix={<LockOutlined className='text-[18px] text-[#c6c6c6]!' />} type="password" placeholder="*********" />
                  </Form.Item>
                  <Form.Item>
                    <Button loading={loading} className='bg-amber-600! font-bold!' size='middle' block type="primary" htmlType="submit">Log in</Button>
                  </Form.Item>
                </Form>
              ),
            },
            {
              key: 'token',
              label: 'Token bilan kirish',
              children: (
                <div>
                  <p className='text-gray-500 text-sm mb-3'>Server ishlamayotgan paytda token orqali kirish mumkin</p>
                  <Input.TextArea
                    size='large'
                    placeholder="Token ni kiriting..."
                    value={manualToken}
                    onChange={(e) => setManualToken(e.target.value)}
                    rows={3}
                    className='mb-3'
                  />
                  <Button 
                    onClick={handleManualToken} 
                    className='bg-green-600! font-bold!' 
                    size='middle' 
                    block 
                    type="primary"
                    icon={<KeyOutlined />}
                  >
                    Token bilan kirish
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Login;
