import { useState } from "react";

export default function VoiceVox(props) {
    const [TextDownload, SetTextDownload] = useState(false);

    var audio;
    var audiourl;

    async function Getaudio(text) {
        const audio_query_response = await fetch(
            `http://160.251.15.165:50021/audio_query?text=${text}&speaker=2`,
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json' }
            }
        )
        const audio_query_json = await audio_query_response.json()

        const synthesis_response = await fetch(
            `http://160.251.15.165:50021/synthesis?speaker=2`,
            {
                method: 'post',
                body: JSON.stringify(audio_query_json),
                responseType: 'arraybuffer',
                headers: { "accept": "audio/wav", 'Content-Type': 'application/json' },
            }
        )
        const synthesis_response_buf = await synthesis_response.arrayBuffer()

        const blob = await new Blob([synthesis_response_buf]);
        audiourl = await URL.createObjectURL(blob)
        audio = await new Audio(audiourl)
    }

    Getaudio(props.text)

    function PlayAudio() {
        audio.play();
    }

    function Download(text) {
        if (TextDownload) {
            let blob = new Blob([text], { type: "text/plain" });
            let link = document.createElement('a');
            link.download = `${text}.txt`;
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
        }
        if (process.browser) {
            let link = document.createElement('a');
            link.download = `${text}.wav`;
            link.href = audiourl;
            link.click();
            URL.revokeObjectURL(link.href);
        }
    }


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
