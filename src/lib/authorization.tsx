/** @format */

export enum ROLES {
  ADMIN = "ADMIN",
  USER = "USER",
}

type RoleTypes = keyof typeof ROLES;

export const useAuthorization = () => {};
