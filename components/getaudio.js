import useSWR from 'swr'
import { useState } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.blob());

export default function GetAudio(props) {
    const [TextDownload, SetTextDownload] = useState(false);

    const { data, error } = useSWR(
        `http://160.251.15.165:2200/voicevox?text=${props.text}`,
        fetcher
    );

    if (error) return (
        <div>
            <div className="toast toast-end">
                <div className="alert alert-error">
                    <div>
                        <span>サーバーとの通信に失敗しました。</span>
                    </div>
                </div>
            </div>
        </div>
    );
    if (!data) return (
        <div>
            <input type="checkbox" id="loading" className="modal-toggle" />
            <div className="modal modal-open modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Loading...</h3>
                </div>
            </div>
        </div>
    );

    var audio = new Audio(URL.createObjectURL(data))
    var blob = URL.createObjectURL(data)

    function PlayAudio() {
        audio.play();
    }

    function Download(text) {
        if (process.browser) {
            if (TextDownload) {
                let blob = new Blob([text], { type: "text/plain" });
                let link = document.createElement('a');
                link.download = `${text}.txt`;
                link.href = URL.createObjectURL(blob);
                link.click();
                URL.revokeObjectURL(link.href);
            }
            let link = document.createElement('a');
            link.download = `${text}.wav`;
            link.href = blob;
            link.click();
            URL.revokeObjectURL(link.href);
        }
    }

    if (props.text) {
        return (
            <div className='py-20 px-5 space-x-10 md:flex'>
                <button className='btn btn-secondary rounded-full w-32 h-32' onClick={() => PlayAudio()}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
                </button>
                <button className='btn btn-secondary rounded-full w-32 h-32' onClick={() => Download(props.text)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                </button>

                <div className='flex py-10'>
                    <p>テキストファイルを出力する</p>
                    <input type="checkbox" onChange={() => SetTextDownload(!TextDownload)} className="checkbox" />
                </div>

            </div>
        )
    }

}



