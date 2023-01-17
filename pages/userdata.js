import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Data() {
    const { data: session } = useSession();

    if (session && session.user) {
        console.log(session)
        return (
            <div>
                <h1 className='text-2xl px-5 py-5'>ユーザー情報</h1>
                <div className="avatar flex justify-center">
                    <div className="w-24 rounded-full">
                        <Image src={session.user.image} width={500} height={500} />
                    </div>
                    <h1 className='text-center text-2xl p-5'>{session.user.name}</h1>

                </div>

                <h1 className='text-center py-10'>Email : {session.user.email}</h1>


            </div>
        );
    }
    return (
        <>
            ログインしてください。
        </>
    );
}