import { DataGame } from "../../System/Game/DataGame";

const {ccclass, property, menu, executeInEditMode} = cc._decorator;

@ccclass
@menu("Script/Feature/Rain/FeatRainCtrl")
export default class FeatRainCtrl extends cc.Component {
    private _material: cc.Material = null;
    private _lastRainForce: number = -1;
    private _lastRainSpeed: number = -1;
    
    start () {
        this._material = this.getComponent(cc.Sprite).sharedMaterials[0];
    }
    
    update(dt) {
        if (this._lastRainForce != DataGame.rainForce) {
            this._lastRainForce = DataGame.rainForce;
            this._material.setProperty('force', this._lastRainForce);
            console.log('=====develop=====', 'force', this._lastRainForce);
        }
        
        if (this._lastRainSpeed != DataGame.rainSpeed) {
            this._lastRainSpeed = DataGame.rainSpeed;
            this._material.setProperty('speed', this._lastRainSpeed);
            console.log('=====develop=====', 'speed', this._lastRainSpeed);
        }
    }
}
