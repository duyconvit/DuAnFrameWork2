import { UseRegister } from '@/interface/type'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UseRegister>()
  const navigate = useNavigate()

  const onSubmit = async (user: UseRegister) => {
    try {
      const { data } = await axios.post(`http://localhost:4000/register`, user)
      alert('Đăng ký thành công!')
      navigate(`/login`)
    } catch (error: any) {
      alert(error?.response?.data || "Có lỗi xảy ra!")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-700">Đăng ký</h2>

        {/* Email Input */}
        <input 
          {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
          type='text'
          placeholder='Email'
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <span className="text-red-500">Email không hợp lệ!</span>}

        {/* Password Input */}
        <input 
          {...register("password", { required: true, minLength: 6 })}
          type='password' // Sửa từ 'text' thành 'password'
          placeholder='Password'
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && <span className="text-red-500">Mật khẩu phải có ít nhất 6 ký tự</span>}

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Đăng ký
        </button>
      </form>
    </div>
  )
}

export default Register
