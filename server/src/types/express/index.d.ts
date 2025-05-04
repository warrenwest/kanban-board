declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

declare namespace Express {
  interface Request {
    user?: {
      username: string;
    };
  }
}
