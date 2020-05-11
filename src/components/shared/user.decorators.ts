import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

export const User = createParamDecorator((data, [root, args, ctx, info]) => {
  const req: Request = ctx.req;
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  }
});
