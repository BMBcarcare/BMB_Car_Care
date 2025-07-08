// import { Request, Response } from 'express'
// import { z } from 'zod'
// import { AuthService } from '~/services/auth.service'

// const loginSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6)
// })

// export const AuthController = {
//   async login(req: Request, res: Response) {
//     try {
//       const { email, password } = loginSchema.parse(req.body)
//       const result = await AuthService.login(email, password)
//       res.json({ success: true, ...result })
//     } catch (err: any) {
//       res.status(400).json({ success: false, message: err.message })
//     }
//   }
// }
