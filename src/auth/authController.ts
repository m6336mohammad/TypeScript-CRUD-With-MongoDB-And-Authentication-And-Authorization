import { Router, Request, Response, NextFunction } from "express";
import {forgotPasswordRequest, login, register} from "./authService";
import { LoginDTO,RegisterDTO,ForgotPasswordDTO} from "./auth_dto";
import  validateMiddlerwers  from "../middleware/validationMiddlerwers";

const router = Router()

router.post("/register",validateMiddlerwers(RegisterDTO),async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: RegisterDTO = req.body;
      const newUser = await register(body);
      res.send(newUser);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post("/login",validateMiddlerwers(LoginDTO),async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: LoginDTO = req.body;
      const loginUser = await login(user);
      res.send(loginUser);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post("/forgotPasswordReq",validateMiddlerwers(ForgotPasswordDTO),async (req: Request, res: Response,next:NextFunction )=>{
    try{
        const user = req.body
        await forgotPasswordRequest(user);
        

    }catch(err: any){
        next(err);
    }

});


export default router;
