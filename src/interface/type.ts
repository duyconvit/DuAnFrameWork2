export interface IProduct
{
    id: number |string,
    name:string,
    image:string,
    price:number,
    description:string,
    quantity?: number,
}
export type ProductForm = Omit<IProduct,"id">
export interface IUser
{
    id: number |string,
    email:string,
    password:string,
}
export type UseRegister = Omit<IUser,"id">
export type UseLogin = Omit<IUser,"id">