import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <div className="navbar bg-orange-300">
                <div className="flex-1">
                    <Link href='/' className="btn btn-ghost text-slate-700 normal-case text-xl">読み上げアプリ(仮)</Link>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={session.user.image} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <Link href='/userdata'><li><a>ユーザーデータ</a></li></Link>
                            <Link href='/index'><li><a>ユーザー辞書設定</a></li></Link>

                            <button onClick={() => signOut()}><li><a>Sign Out</a></li></button>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="navbar bg-orange-300">
            <div className="flex-1">
                <a className="btn btn-ghost text-slate-700 normal-case text-xl">読み上げアプリ(仮)</a>
            </div>
            <div className="flex-none">
                <button class="btn btn-primary" onClick={() => signIn()}>ログイン</button>
            </div>
        </div >
    );


}