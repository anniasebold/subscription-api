import { Injectable, NestMiddleware } from '@nestjs/common';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Token não fornecido.' });
    }

    const token = req.headers.authorization.replace('Bearer ', '');
    const decodedToken = jwt.decode(token);
    if (!decodedToken) {
      return res.status(401).json({ message: 'Usuário não autorizado.' });
    }

    try {
      const validateTokenResponse = await axios.get(
        'https://auth.facoffee.hsborges.dev/realms/facoffee/protocol/openid-connect/userinfo',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const expectedFields = [
        'sub',
        'email_verified',
        'name',
        'preferred_username',
        'given_name',
        'family_name',
        'email',
      ];

      const isExpectedResponse = expectedFields.every(
        (prop) => decodedToken[prop] === validateTokenResponse.data[prop],
      );

      if (!isExpectedResponse) {
        return res
          .status(401)
          .json({ message: `Token informado tem propriedades inválidas.` });
      }
    } catch (error) {
      return res
        .status(401)
        .json({ message: 'Usuário não autorizado ou token inválido.' });
    }
    next();
  }
}
