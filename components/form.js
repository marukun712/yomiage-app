import { useState } from 'react';
import Image from 'next/image'
import { useEffect } from 'react';
import csv from 'csv-parser'
var stream = csv()

export default function Form() {
    const [Text, SetText] = useState('')
    const [addText, setAddText] = useState([]);

    stream.on('data', function (data) {
        console.log(data)
        setAddText((prevState) => ([...prevState, { 'word': data.Word }]));

    })

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
            const content = e.target.result;
            stream.write(content)
        };
    }

    function ExportData() {
        if (process.browser) {
            const data = JSON.stringify(addText);
            const blob = new Blob([data], { type: 'application/json' })
            const link = document.createElement('a');
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
            const content = e.target.result;
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
                            </>

                        )
                    })}
                </div>

                <div className='h-1/2 justify-end'>
                    <Image src='/tsukuyomi.png' width={500} height={1000}></Image>
                    <p className='px-5'>つくよみちゃん</p>
                </div>

            </div>

            <div className='space-x-7 px-5'>
                <button className='btn btn-primary' onClick={ExportData}>プロジェクトを保存...</button>
                <label for="json_upload" className='btn btn-primary'>
                    プロジェクトをインポート...
                    <input type="file" id="json_upload" className='hidden' onChange={ImportData} accept='.json'></input>
                </label>


                <label for="csv_upload" className='btn btn-primary'>
                    CSVから台本を読み込み...
                    <input type="file" id="csv_upload" className='hidden' onChange={ImportFromCSV} accept='.csv'></input>
                </label>
            </div>


            <div className='input space-x-9 py-10 w-screen flex'>
                <input type="text" placeholder="テキストを入力..." className="input input-bordered p-50 input-lg w-screen flex" value={Text} onChange={function (e) { SetText(e.target.value) }} />
                <button className="btn" onClick={onClickAddText}>追加</button>
            </div>

        </div>
    )
}