import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { CheckIfLoading } from '@components/Loading';

import { Post } from '@prisma/client';
import { Alert, AlertType } from '@components/Alert';
import ViewPost from '@components/pages/post/View';



export default function ConfirmPost({ post }: { post: Post }) {
    const router = useRouter();
    const [alert, setAlert] = useState<AlertType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const markPostActive = async () => {
        setLoading(true);
        const res = await fetch(`/create/${post.id}/api`, {
            method: 'PUT',
            body: post.id,
            headers: { 'Content-Type': 'application/json' }
        });
        const resJson = await res.json();
        if (resJson.cStatus==200 || resJson==201) {
            router.push(`/post/${resJson.postId}`);
        }
        else {
            setAlert(resJson);
            setLoading(false);
        }
    }

    return (
        <div style={{ padding: '20px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
            <CheckIfLoading loading={loading} content={
                <Confirm post={post} confirmPostAction={markPostActive} alert={alert} />
            }/>
        </div>
    );
}



interface ConfirmPostType {
    post: Post,
    confirmPostAction: ()=>void,
    alert: AlertType | null
}

function Confirm({ post, confirmPostAction, alert }: ConfirmPostType) {
    const router = useRouter();
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center', gap: '5px' }} >
                <h1>Confirm your post</h1>
                <h2>You are allowed to edit later</h2>
                {alert && <Alert alert={alert}  />}
            </div>
            <ViewPost post={post} />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                <button style={{ backgroundColor: 'var(--red)' }} onClick={() => router.push('/create/')}>Back</button>
                <button onClick={confirmPostAction}>Confirm</button>
            </div>
        </>
    );
}