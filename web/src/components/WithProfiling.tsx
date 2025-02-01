import React, {useState, Profiler, JSX} from "react";

type ProfilingProps = {
    children: JSX.Element;
    id: string;
    ignoreUnder?: number;
}

const WithProfiling: React.FC<ProfilingProps> = ({children, id, ignoreUnder} ) => {
    const [threshold] = React.useState(ignoreUnder || 10);
    function onRender(id: string, phase: string, actualDuration: number, baseDuration: number) {
        if (actualDuration > threshold) {
            console.log('tuner', {id, phase, actualDuration, baseDuration, threshold});
        }
    }

    return (
        <Profiler id={id} onRender={onRender}>
            {children}
        </Profiler>
    );
}

export default WithProfiling;
