import { Button, Form, Input } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';

import GoogleIcon from '../../assets/Login/GoogleIcon.png';
import FacebookIcon from '../../assets/Login/FacebookIcon.png';
import { AuthContext } from '../../context/AuthContext';
import { ApiLoginByEmailAndPassword, ApiGetCurrentAccountRole, ApiLoginWithGoogle } from '../../api/User/ApiAuthentication';

function LoginPage() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { setAuth, auth } = useContext(AuthContext);
    const location = useLocation();

    const fromPage = location.state?.from?.pathname || "/";

    const CallApiLoginByEmailAndPassword = async (payload) => {
        const responseLogin = await ApiLoginByEmailAndPassword({ payload });
        if (responseLogin?.status === 200) {
            const role = await CallApiGetCurrentAccountRole();
            console.log('current role:', role);

            toast.success('Đăng nhập thành công!');
            if (role.toLowerCase() == 'admin') {
                console.log('Dăng nhập admin');
                navigate('/admin', { replace: true })

            } else if (role.toLowerCase() == 'staff') {
                navigate('/staff', { replace: true })

            } else {
                navigate(fromPage, { replace: true });
            }
        } else {
            toast.error('Đăng nhập thất bại!');
        }
    }

    const CallApiGetCurrentAccountRole = async () => {
        const response = await ApiGetCurrentAccountRole();
        setAuth({
            roleName: response.roleName,
        })
        return response?.roleName
    }

    const onFinish = async (values) => {
        await CallApiLoginByEmailAndPassword(values);
    }

    // Chặn người dùng đã đăng nhập vào trang login
    const checkRole = () => {
        if (auth.roleName.toLowerCase() == 'customer') {
            navigate('/')
        } else if (auth.roleName.toLowerCase() == 'admin') {
            navigate('/admin')
        } else if (auth.roleName.toLowerCase() == 'staff') {
            navigate('/staff')
        }
    }

    const CallApiLoginWithGoogle = async (credential) => {
        const response = await ApiLoginWithGoogle(credential)
        if (response?.status === 200) {
            const role = await CallApiGetCurrentAccountRole();
            toast.success('Đăng nhập thành công!');

            if (role.toLowerCase() == 'admin') {
                navigate('/admin', { replace: true })

            } else if (role.toLowerCase() == 'staff') {
                navigate('/staff', { replace: true })

            } else {
                navigate(fromPage, { replace: true });
            }
        } else {
            toast.error('Đăng nhập thất bại!');
        }
    }

    const handleLoginWithGoogle = (credential) => {
        CallApiLoginWithGoogle(credential)
    }

    useEffect(() => {
        checkRole();
    }, [auth])

    return (
        <div className="bg-[#f2f7fb] ">
            <div className="w-full max-w-[540px] mx-auto min-h-[95vh] text-center flex items-center justify-center">
                <div className="flex flex-col justify-center grow-1 w-full">
                    <div className="flex flex-col bg-[white] rounded-[20px] p-[30px] text-start gap-[40px]">
                        {/* Phần chữ giới thiệu */}
                        <div>
                            <h3 className="text-[24px] font-bold leading-[37px]">
                                Đăng nhập
                            </h3>
                            <div className="text-[#575864] text-[14px] font-normal leading-[20px]">
                                Nhập email và mật khẩu để đăng nhập
                            </div>
                        </div>
                        {/* Phần điền form đăng nhập */}
                        <div className="flex flex-col gap-[24px] relative">
                            <Form layout='vertical' form={form} onFinish={onFinish}>
                                <Form.Item
                                    className='font-bold text-[14px] leading-[20px] text-[#111] mb-[10px]'
                                    label="Địa chỉ email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email address!',
                                        },
                                        {
                                            type: 'email',
                                            message: 'Invalid email'
                                        }
                                    ]}
                                >
                                    <Input className='px-[22px] py-[14px] font-normal' />
                                </Form.Item>

                                <Form.Item
                                    className='font-bold text-[14px] leading-[20px] text-[#111] mb-[10px]'
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                        {
                                            min: 6,
                                            message: 'Password must be at least 6 characters!'
                                        }
                                    ]}
                                >
                                    <Input.Password className='px-[22px] py-[14px] font-normal' />
                                </Form.Item>

                                <Form.Item className='mb-[0] '>
                                    <Link to='/forgot-password' className='flex items-center justify-end '>
                                        <p className='text-[14px] leading-[20px] text-[#2275fc] font-normal cursor-pointer'>
                                            Quên mật khẩu?
                                        </p>
                                    </Link>
                                </Form.Item>

                                <Form.Item className='mb-0'>
                                    <Button className='mt-[1rem] h-[50px] py-[15px] px-[22px] flex items-center justify-center text-[14px] font-bold leading-[20px] w-full' type="primary"
                                        htmlType='submit'
                                    >
                                        Đăng nhập
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                        {/* Phần đăng nhập với google */}
                        <div>
                            <div className='text-[12px] leading-[15px] text-[#95989d] mb-[16px] text-center'>
                                Or continue with social account
                            </div>
                            <div className='flex gap-[16px] items-center justify-center'>
                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        handleLoginWithGoogle(credentialResponse?.credential)
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }} />

                                {/* <div className='cursor-pointer group hover:bg-[#2275fc] text-[#575864] bg-[#fff] border-[#ecf0f4] h-[50px] py-[15px] px-[22px] flex items-center justify-center text-[14px] gap-[8px] font-bold leading-[20px] border-[1px] border-solid rounded-[12px] w-full '>
                                    <img src={GoogleIcon} alt='Google Icon' className='w-[20px] h-[20px]' />
                                    <span className='text-[#111] group-hover:text-[white]'>
                                        Sign in with Google
                                    </span>
                                </div> */}

                                {/* <div className='cursor-pointer group hover:bg-[#2275fc] text-[#575864] bg-[#fff] border-[#ecf0f4] h-[50px] py-[15px] px-[22px] flex items-center justify-center text-[14px] gap-[8px] font-bold leading-[20px] border-[1px] border-solid rounded-[12px] w-full'>
                                    <img src={FacebookIcon} alt='Facebook Icon' className='w-[25px] h-[25px]' />
                                    <span className='text-[#111] group-hover:text-[white]'>
                                        Sign in with Facebook
                                    </span>
                                </div> */}
                            </div>
                        </div>
                        {/* Phần để chuyển qua đăng kí nếu chưa có tài khoản */}
                        <div className='text-[#575864] text-[14px] font-normal leading-[20px] text-center'>
                            You don't have an account yet?
                            <Link to="/register" className='text-[#2275fc]'> Register Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;