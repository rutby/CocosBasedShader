const {ccclass, property, menu, executeInEditMode} = cc._decorator;

@ccclass
@executeInEditMode
@menu("Script/Comps/MultiTextureSelector")
export default class MultiTextureSelector extends cc.Component {
    @property(cc.Integer) idx: number = 0;
    
    start () {
        // 不改动cocos源码的情况下支持多纹理, 以降低drawcall
        this.node.color = cc.color(Math.ceil(this.idx / 8 * 255), 255, 255);
    }
}
