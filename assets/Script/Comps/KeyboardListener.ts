const {ccclass, property, menu, executeInEditMode} = cc._decorator;

@ccclass
@menu("Script/Comps/KeyboardListener")
export default class KeyboardListener extends cc.Component {
    //================================================ cc.Component
    onLoad() {
        CC_PREVIEW && cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onEventKeyDown, this);
    }

    onDestroy() {
        CC_PREVIEW && cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onEventKeyDown, this);
    }

    //================================================ Events
    onEventKeyDown(event) {
        switch(event.keyCode) {
            case 'A'.charCodeAt(0): // -雨密度
                break;
            case 'D'.charCodeAt(0): // +雨密度
                break;
            case 'W'.charCodeAt(0): // +雨速度
                break;
            case 'S'.charCodeAt(0): // -雨速度
                break;
            default:
                break;
        }
    }
}
