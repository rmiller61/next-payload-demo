"use client"

import React, { useRef, useState } from "react"
import ReactPlayer, { type ReactPlayerProps } from "react-player"
import classes from './index.module.scss';

const Video: React.FC = () => {

    const [url, setUrl] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <>
            <div className={classes.inputRow}>
                <input type="url" ref={inputRef} />
                <button onClick={() => {
                    const value = inputRef?.current?.value
                    if (value) setUrl(value)
                }}>Set URL</button>
            </div>
            {url && <div className={classes.playerWrapper}><ReactPlayer url={url} width="100%" height="100%" controls={true} className={classes.reactPlayer} /></div>}
        </>
    )
}

export default Video