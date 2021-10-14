namespace Express {
  interface Request {
    user?: JwtPayload | undefined;
  }
}

interface JwtPayload {
  _id: string;
  email: string;
}

interface RefreshJwtPayload {
  _id: string;
  tokenVersion: number;
}
