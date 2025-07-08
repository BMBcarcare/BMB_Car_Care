// import { compareSync } from 'bcrypt'
// import { signToken } from '../utils/jwt'

// export const AuthService = {
//   async login(email: string, password: string) {
//     const user = await UserModel.findOne({ email })
//     if (!user) throw new Error('Tài khoản không tồn tại')
//     const match = compareSync(password, user.password)
//     if (!match) throw new Error('Mật khẩu không đúng')

//     const token = signToken({ _id: user._id, role: user.role })
//     return { token, role: user.role, user_id: user._id }
//   }
// }
