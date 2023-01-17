import useSWR from 'swr'
import { useState } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.blob());

export default function Fetch(props) {
    const { data, error } = useSWR(
        `http://127.0.0.1:8000/api?text=${props.text}`,
        fetcher
    );

    if (error) return <div>An error has occurred.</div>;
    if (!data) return <div>Loading...</div>;
    var audio = URL.createObjectURL(data)


    return (
        <audio src={audio} controls></audio>
    )
};

