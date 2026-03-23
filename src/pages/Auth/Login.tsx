import { KeyOutlined, LockOutlined, UserOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, Tabs } from 'antd';
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
      toast.success("Muvaffaqiyatli kirdingiz!")
      setLoading(false)
      setTimeout(() => {
        setCookie("token", res.data.data.tokens.accessToken)
        navigate(PATH.home)
      }, 1000)
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
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      {/* Background Pattern */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl'></div>
      </div>

      <div className='relative w-full max-w-md'>
        {/* Logo */}
        <div className='text-center mb-8'>
          <div className='w-16 h-16 bg-gradient-to-br from-primary to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/25'>
            <SafetyCertificateOutlined className='text-3xl text-white' />
          </div>
          <h1 className='text-3xl font-bold text-foreground'>EduERP</h1>
          <p className='text-muted-foreground mt-2'>Ta'lim boshqaruv tizimi</p>
        </div>

        {/* Login Card */}
        <div className='bg-card border border-border rounded-2xl p-8 shadow-xl'>
          <Tabs
            defaultActiveKey="login"
            centered
            className='login-tabs'
            items={[
              {
                key: 'login',
                label: <span className='text-foreground'>Kirish</span>,
                children: (
                  <Form
                    autoComplete='off'
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                    className='mt-4'
                  >
                    <Form.Item
                      name="email"
                      label={<span className='text-secondary-foreground'>Email</span>}
                      rules={[{ required: true, message: 'Email kiriting!' }]}
                    >
                      <Input
                        allowClear
                        size='large'
                        prefix={<UserOutlined className='text-muted-foreground' />}
                        placeholder="email@example.com"
                        className='h-12'
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      label={<span className='text-secondary-foreground'>Parol</span>}
                      rules={[{ required: true, message: 'Parol kiriting!' }]}
                    >
                      <Input.Password
                        size='large'
                        prefix={<LockOutlined className='text-muted-foreground' />}
                        placeholder="Parolingiz"
                        className='h-12'
                      />
                    </Form.Item>
                    <Form.Item className='mb-0 mt-6'>
                      <Button
                        loading={loading}
                        size='large'
                        block
                        type="primary"
                        htmlType="submit"
                        className='h-12 text-base font-semibold'
                      >
                        Kirish
                      </Button>
                    </Form.Item>
                  </Form>
                ),
              },
              {
                key: 'token',
                label: <span className='text-foreground'>Token</span>,
                children: (
                  <div className='mt-4'>
                    <div className='bg-secondary/50 border border-border rounded-xl p-4 mb-4'>
                      <p className='text-sm text-muted-foreground'>
                        Server ishlamayotgan paytda token orqali kirish mumkin.
                        Tokenni quyidagi maydonga kiriting.
                      </p>
                    </div>
                    <Input.TextArea
                      size='large'
                      placeholder="JWT tokenni kiriting..."
                      value={manualToken}
                      onChange={(e) => setManualToken(e.target.value)}
                      rows={4}
                      className='mb-4'
                    />
                    <Button
                      onClick={handleManualToken}
                      size='large'
                      block
                      type="primary"
                      icon={<KeyOutlined />}
                      className='h-12 text-base font-semibold bg-gradient-to-r from-accent to-green-400 border-none'
                    >
                      Token bilan kirish
                    </Button>
                  </div>
                ),
              },
            ]}
          />
        </div>

        {/* Footer */}
        <p className='text-center text-muted-foreground text-sm mt-6'>
          2024 EduERP. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </div>
  );
};

export default Login;
