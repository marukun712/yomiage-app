import { useState } from 'react';
import Image from 'next/image'
import { parse } from 'csv-parse/sync';
import GetAudio from '../components/getaudio'
import Link from 'next/link';

export default function Form() {
    const [Text, SetText] = useState('')
    const [addText, setAddText] = useState([]);
    const [FetchText, SetFetchText] = useState('')

    const onClickAddText = async () => {
        if (Text === '') {
            alert('テキストボックスに文字を入力してください！')
        } else {
            await setAddText((prevState) => ([...prevState, { 'word': Text }]));
            await SetText("");
        }
    }

    async function ImportFromCSV(e) {
        let file = await e.target.files[0]
        const fileReader = new FileReader();

        fileReader.readAsText(file);
        fileReader.onload = e => {
            let content = e.target.result;
            let records = parse(content, { columns: true, delimiter: '\t' });
            for (let record of records) {
                setAddText((prevState) => ([...prevState, { 'word': record.Word }]));
            }
        };
    }

    function ExportData() {
        if (process.browser) {
            let data = JSON.stringify(addText);
            let blob = new Blob([data], { type: 'application/json' })
            let link = document.createElement('a');
            link.download = 'export.json';
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
        }
    }

    async function ImportData(e) {
        let file = await e.target.files[0]
        const fileReader = new FileReader();

        fileReader.readAsText(file, "UTF-8");
        fileReader.onload = e => {
            let content = e.target.result;
            setAddText(JSON.parse(content));
        };
    }

    return (
        <div>
            <div className='Wordarea flex'>
                <div className='flex-col space-y-10 py-16 px-5 w-4/5 justify-start' style={{ height: "750px", overflow: 'scroll' }}>
                    {addText.map(function (text, num) {
                        return (
                            <>
                                <input type="text" placeholder={text.word} className="input input-bordered p-50 w-full input-lg flex-col" value={text.word} onChange={(e) => setAddText((prevState) => prevState.map((value, index) => (index === num ? { 'word': e.target.value } : value)))} />
                                <button className='btn btn-primary' onClick={() => SetFetchText(text.word)}>合成</button>
                            </>

                        )
                    })}
                </div>

                <div className='h-1/2 justify-end'>
                    <Link href={'/metan'}>
                        <Image src='/metan.png' width={450} height={800}></Image>
                        <p className='px-5'>四国めたん(VOICEVOX)</p>
                    </Link>
                </div>

            </div>

            <div className='md:space-x-7 md:px-5 space-y-5'>
                <button className='btn btn-primary' onClick={ExportData}>プロジェクトを保存...</button>
                <label htmlFor="json_upload" className='btn btn-primary'>
                    プロジェクトをインポート...
                    <input type="file" id="json_upload" className='hidden' onChange={ImportData} accept='.json'></input>
                </label>

                <Link href='/sample.csv'><button className='btn btn-primary'>台本記入用のサンプルCSVをダウンロード...</button></Link>

                <label htmlFor="csv_upload" className='btn btn-primary'>
                    CSVから台本を読み込み...
                    <input type="file" id="csv_upload" className='hidden' onChange={ImportFromCSV} accept='.csv'></input>
                </label>
            </div>

            <div className='input space-x-9 py-10 w-screen flex'>
                <input type="text" placeholder="テキストを入力..." className="input input-bordered p-50 input-lg w-screen flex" value={Text} onChange={function (e) { SetText(e.target.value) }} />
                <button className="btn" onClick={onClickAddText}>追加</button>
            </div>

            <GetAudio text={FetchText}></GetAudio>

        </div>
    )
}
