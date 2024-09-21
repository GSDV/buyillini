import { Prisma } from '@prisma/client';

export type User = Prisma.UserGetPayload<{}>;
export type RedactedUser = Prisma.UserGetPayload<{ omit: {password: true, salt: true} }>;
export type RedactedUserWithPosts = Prisma.UserGetPayload<{ omit: {password: true, salt: true}, include: {posts: true} }>;
export type PostWithRedactedUser = Prisma.PostGetPayload<{ include: {seller: {omit: {password: true, salt: true}}} }>;