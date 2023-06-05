"use client"

import React, { useRef } from "react"
import ReactPlayer, { type ReactPlayerProps } from "react-player"
import classes from './index.module.scss';
import { useField } from 'payload/components/forms'

type Props = {
    label: string
}

const Video: React.FC = ({label}: Props) => {

    const { value, setValue } = useField<string>({ path: 'videoUrl' })
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <>
            <label className="field-label">{label}</label>
            <div className={classes.inputRow}>
                <div className={`field-type text ${classes.textWrapper}`}>
                    <input type="url" ref={inputRef} />
                </div>
                <button 
                className={`btn btn--style-primary btn--size-medium`}
                style={{ marginTop: 0 }}
                type="button"
                onClick={() => {
                    const value = inputRef?.current?.value
                    if (value) setValue(value)
                }}><span className="btn__content"><span className="btn__label">Set URL</span></span></button>
            </div>
            {/**Boolean(value) && <div className={classes.playerWrapper}><ReactPlayer url={value} width="100%" height="100%" className={classes.reactPlayer} /></div>**/}
            {/**value && <div className={classes.playerWrapper}><iframe src={value} width="100%" height="100%" className={classes.reactPlayer} /></div> **/}
        </>
    )
}

export default Video