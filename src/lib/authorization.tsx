/** @format */

import * as React from "react";

// import { Comment, User } from '@/types/api';

import { useUser } from './auth';

export enum ROLES {
  ADMIN = "ADMIN",
  USER = "USER",
}

type RoleTypes = keyof typeof ROLES;

export const useAuthorization = () => {};
