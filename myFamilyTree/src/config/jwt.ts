import jwt from "jsonwebtoken";
import { config } from "./config";

/**
 * Generate access token (short-lived)
 */
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, config.jwt.secret as any, {
    expiresIn: config.jwt.expiresIn as any,
  });
};

/**
 * Generate refresh token (long-lived)
 */
export const generateRefreshToken = (payload: object): string => {
  return jwt.sign(payload, config.jwt.refreshSecret as any, {
    expiresIn: config.jwt.refreshExpiresIn as any,
  });
};

/**
 * Verify access token
 */
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    return null;
  }
};

/**
 * Verify refresh token
 */
export const verifyRefreshToken = (token: string): any => {
  try {
    return jwt.verify(token, config.jwt.refreshSecret);
  } catch (error) {
    return null;
  }
};
