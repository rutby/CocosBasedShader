const {ccclass, property, menu, executeInEditMode} = cc._decorator;

@ccclass
@menu("Script/Feature/Rain/FeatRainCtrl")
export default class FeatRainCtrl extends cc.Component {
    private _material: cc.Material = null;
    
    start () {
        this._material = this.getComponent(cc.Sprite).sharedMaterials[0];
    }
    
    update(dt) {
        this._material.setProperty('time', this._time);
    }
}
