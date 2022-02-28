const {ccclass, property, menu, executeInEditMode} = cc._decorator;

@ccclass
@menu("Script/Tools/SLBatch/Adapter")
export default class SLBatchAdapter extends cc.Component {
    @property(cc.Material) material: cc.Material = null;
    
    isCalled: boolean = false;
    
    protected start(): void {
        this.generateShareAtlas();
        this.bindShareAtlas();
        this.replaceDefaultMaterial(this.node);
    }
    
    //================================================
    generateShareAtlas() {
        var node = new cc.Node();
        var label = node.addComponent(cc.Label);
        label.cacheMode = cc.Label.CacheMode.CHAR;
    }
    
    bindShareAtlas() {
        //@ts-ignore 
        this.material.setProperty('texture1', cc.Label._shareAtlas._fontDefDictionary._texture);
    }
    
    replaceDefaultMaterial(node) {
        node.children.forEach(element => {
            // 名称含有noslbatch的节点不做处理
            if (element.name.indexOf('noslbatch') < 0) {
                var sp = element.getComponent(cc.Sprite);
                if (sp) {
                    var texture = sp.spriteFrame.getTexture();
                    for(var i = 0; i < 8; i++) {
                        //@ts-ignore 
                        if (this.material._techniqueData[0].props['texture' + i] == texture) {
                            sp.texId = i;
                            break;
                        }
                    }
                    
                    sp.setMaterial(0, this.material);
                    //@ts-ignore
                    sp.getMaterials()[0]._manualHash = 9999;
                }
                
                var label = element.getComponent(cc.Label);
                if (label) {
                    label.cacheMode = cc.Label.CacheMode.CHAR;
                    label.texId = 1;
                    
                    label.setMaterial(0, this.material);
                    //@ts-ignore
                    label.getMaterials()[0]._manualHash = 9999;
                }
                
                this.replaceDefaultMaterial(element);
            }
        })
    }
}
