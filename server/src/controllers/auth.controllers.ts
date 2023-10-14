import { type Response, type NextFunction, type Request } from 'express'
import bcrypt from 'bcrypt'

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash1 = bcrypt.hashSync(password, salt);

  console.log('hash', hash1)

  // const verifyPass1 = bcrypt.compareSync('popino', hash1);

}

export {
  signup
}