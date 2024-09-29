// Admin actions
'use server';

import { prisma } from '@util/prisma/client';
import { getRedactedUserFromAuth } from '@util/prisma/actions/user';
import { RedactedUser } from '@util/prisma/types';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { deleteFromS3 } from '@util/s3/aws';



export const isAdmin = async (authTokenCookie: RequestCookie | undefined) => {
    if (!authTokenCookie) return false;
    const userPrisma = await getRedactedUserFromAuth(authTokenCookie.value);
    return isUserAdmin(userPrisma);
}

export const isUserAdmin = (user: RedactedUser | null) => {
    return (user!=null && !user.banned && !user.deleted && user.active && user.role==='ADMIN');
}





/*********
 * USERS *
 *********/

export const getUser = async (where: any) => {
    return (await prisma.user.findFirst({ where }));
}

export const updateUser = async (where: any, data: any) => {
    await prisma.user.update({ where, data });
}


// Mark a user as deleted, and mark all of his posts as deleted too
export const markDeleteUser = async (where: any) => {
    const res = await prisma.user.update({
        where,
        data: {
            deleted: true,
            posts: {
                updateMany: {
                    where: { deleted: false, active: true },
                    data: { deleted: true }
                }
            }
        }
    });
}


export const deleteUser = async (where: any) => {
    const res = await prisma.user.delete({ where });
}


export const banUser = async (where: any, msg: string, expiration: Date | null) => {
    const res = await prisma.user.update({
        where,
        data: {
            banned: true,
            banMsg: msg,
            banExpiration: expiration,
            posts: {
                updateMany: {
                    where: { deleted: false, active: true },
                    data: { deleted: true }
                }
            }
        }
    });
}





/*********
 * POSTS *
 *********/

export interface SuperPostData {
    title: string,
    description: string,
    category: string,
    size: string,
    gender: string,
    price: number,
    images: string[],
    duration: number,
}



export const deletePost = async (postId: string) => {
    const postPrisma = await prisma.post.delete({
        where: { id: postId }
    });
    if (!postPrisma) return null;
    for (let i=0; i<postPrisma.images.length; i++) deleteFromS3(postPrisma.images[i]); // Asynchronous process
    return postPrisma;
}