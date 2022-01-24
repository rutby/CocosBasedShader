const {ccclass, property, menu, requireComponent} = cc._decorator;


@ccclass
@menu("Script/Comps/PostProcess/PostProcess")
@requireComponent(cc.Camera)
export default class PostProcess extends cc.Component {
    @property(cc.Sprite) spPostProcess: cc.Sprite = null;
    
    private camera: cc.Camera = null;
    private rt: cc.RenderTexture = null;
    private sf: cc.SpriteFrame = null;
    
    start () {
        this.camera = this.getComponent(cc.Camera);
        this.rt = new cc.RenderTexture();
        this.rt.initWithSize(cc.winSize.width, cc.winSize.height);
        this.camera.targetTexture = this.rt;
        
        this.sf = new cc.SpriteFrame();
        this.sf.setTexture(this.rt);
        this.spPostProcess.spriteFrame = this.sf;
        this.spPostProcess.node.width = cc.winSize.width;
        this.spPostProcess.node.height = cc.winSize.height;
    }
}
