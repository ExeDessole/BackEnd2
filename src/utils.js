import { genSaltSync } from "bcrypt";
import bcrypt from "bcryptjs";

export const createHash = password => bcrypt.hashSync((password, genSaltSync(10)));
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

