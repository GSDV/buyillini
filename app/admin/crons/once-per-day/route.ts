import { NextRequest } from 'next/server';
import { unbanExpiredUsers } from '@util/prisma/actions/crons';



export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) return new Response('Unauthorized', {status: 401});

        const unbanCount = await unbanExpiredUsers();
        console.log(`Unbanned ${unbanCount} users.`);

        return Response.json({ success: true });
    }  catch (err) {
        console.log(`Error marking expired posts as deleted: ${err}`);
        return Response.json({ success: false }, { status: 400 });
    }
}