'use client';

import { useEffect, useState } from 'react';

import CenterLayout from '@components/containers/CenterLayout';
import NeedsToBeLoggedIn from '@components/NeedsToBeLoggedIn';
import Create from '@components/pages/post/Create';

import { Post } from '@prisma/client';
import { CheckIfLoading } from '@components/Loading';



export default function Page() {
    const [loading, setLoading] = useState<boolean>(true);
    const [pastPost, setPastPost] = useState<Post | null>(null);

    const fetchDraftedPost = async () => {
        setLoading(true);
        const res = await fetch(`/create/api`, { method: 'GET' });
        const resJson = await res.json();
        if (resJson.cStatus==200) setPastPost(resJson.draftedPost);
        setLoading(false);
    }

    useEffect(() => {
        fetchDraftedPost();
    }, []);

    return (
        <CenterLayout>
            <CheckIfLoading loading={loading} content={
                <NeedsToBeLoggedIn content={
                    <NeedsToBeLoggedIn content={
                        <Create draftedPost={pastPost as Post} />
                    } />
                } />
            } />
        </CenterLayout>
    );
}