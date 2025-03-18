import { ProductForm } from '@/interface/type'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const Edit = () => {
  const {register,handleSubmit,reset, formState:{errors}} = useForm<ProductForm>()
  const params = useParams()
  useEffect(()=>{
    (async()=>{
try {
  const {data} = await axios.get(`http://localhost:4000/students/${params.id}`)
  reset(data)
} catch (error) {
  console.log(error)
}
    })()
  },[])
  const navigate = useNavigate()
  const onSubmit = async (product:ProductForm)=>
  {
    try {
      const {data} = await axios.put(`http://localhost:4000/students/${params.id}`,product)
      alert('Cập nhật sản phẩm thành công ')
      navigate(`/students`)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
  <h2 className="text-2xl font-bold text-center text-gray-700">Cap nhat Sản Phẩm</h2>

  <input 
    {...register("name",{required:true})}
    type='text'
    placeholder='Ten san pham'
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {(errors.name)&& <span>Khong duoc de trong </span>}
  <input 
    {...register("image",)}
    type='text'
    placeholder='anh san pham'
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input 
    {...register("price",{required:true , pattern:/^\d+(\.\d+)?$/})}
    type='text'
    placeholder='Gia san pham'
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {(errors.price)&& <span>gia khong am </span>}
  <input 
    {...register("description")}
    type='text'
    placeholder='Ten san pham'
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button 
    type="submit" 
    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
  >
   Cập nhật Sản Phẩm
  </button>
</form>
    </div>
  )
}

export default Edit
