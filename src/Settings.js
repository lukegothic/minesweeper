import React, {Component} from 'react';
class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            w: 9,
            h: 9,
            mines: 10,
            onEndSettings: props.onEndSettings
        }
    }
    handleFieldChange = (e) => {
        const key = e.target.name;
        let value;
        switch(key) {
            case "w":
            case "h":
            case "mines":
                value = parseInt(e.target.value);
            break;
        }
        this.setState({ [key]: value });
     }
    render() {
        return <div className="scene settings">
            <label>Width<input name="w" value={this.state.w} onChange={this.handleFieldChange} /></label>
            <label>Height<input name="h" value={this.state.h} onChange={this.handleFieldChange} /></label>
            <label>Mines<span><input name="mines" value={this.state.mines} onChange={this.handleFieldChange}/></span></label>
            <button onClick={() => this.state.onEndSettings(this.state)}>Start</button>
        </div>
    }
}
export default Settings;