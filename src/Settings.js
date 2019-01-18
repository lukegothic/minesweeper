import React from 'react';
const Settings = ({defaultSettings, onEndSettings}) => {
    return (
        <div className="scene settings">
            <label>W<span>{defaultSettings.w}</span></label>
            <label>H<span>{defaultSettings.h}</span></label>
            <label>Mines<span>{defaultSettings.mines}</span></label>
            <button onClick={() => onEndSettings(defaultSettings)}>Start</button>
        </div>
    )
}
export default Settings;