import { UseLogin } from '@/interface/type'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UseLogin>()
  const navigate = useNavigate()
  const onSubmit = async (user: UseLogin) => {
    try {
      const { data }  = await axios.post(`http://localhost:4000/login`, user)
      alert('Dang nhap thanh cong ')
      navigate(`/students`)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-700">Dang nhap </h2>

        <input
          {...register("email", { required: true, pattern: /^\S+@+(\S+\.)+[a-zA-Z]{2,6}$/ })}
          type='text'
          placeholder='Email'
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {(errors.email) && <span>Dung dinh dang email </span>}
        <input
          {...register("password", { required: true, minLength: 6 })}
          type='text'
          placeholder='Password'
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {(errors.password) && <span>mat khau phai bang 6 hoac lon hon 6  </span>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Dang nhap
        </button>
      </form>
    </div>
  )
}

export default Login
