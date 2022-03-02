const {ccclass, property, menu, executeInEditMode} = cc._decorator;

@ccclass
@menu("Script/Tools/SLBatch/Adapter")
export default class SLBatchAdapter extends cc.Component {
    @property(cc.Material) material: cc.Material = null;
    
    isCalled: boolean = false;
    defaultPassHash: string = '';
    
    protected start(): void {
        this.defaultPassHash = this.getMaterialHash();
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
                if (sp && this.getRenderComponentHash(sp) == this.defaultPassHash) {
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
                if (label && this.getRenderComponentHash(label) == this.defaultPassHash) {
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
    
    serializePass(pass) {
        let str = pass._cullMode;
        if (pass._blend) {
            str += pass._blendEq + pass._blendAlphaEq + pass._blendSrc + pass._blendDst
                + pass._blendSrcAlpha + pass._blendDstAlpha + pass._blendColor;
        }
        if (pass._depthTest) {
            str += pass._depthWrite + pass._depthFunc;
        }
        if (pass._stencilTest) {
            str += pass._stencilFuncFront + pass._stencilRefFront + pass._stencilMaskFront
                + pass._stencilFailOpFront + pass._stencilZFailOpFront + pass._stencilZPassOpFront
                + pass._stencilWriteMaskFront
                + pass._stencilFuncBack + pass._stencilRefBack + pass._stencilMaskBack
                + pass._stencilFailOpBack + pass._stencilZFailOpBack + pass._stencilZPassOpBack
                + pass._stencilWriteMaskBack;
        }
    
        return str;
    }
    
    serializePasses (passes) {
        let hashData = '';
        for (let i = 0; i < passes.length; i++) {
            hashData += this.serializePass(passes[i]);
        }
        return hashData;
    }
    
    getHash(effectVar) {
        let hash = '';
        hash += this.serializePasses(effectVar._passes);
        
        return hash;
    }
    
    getRenderComponentHash(rc) {
        return this.getHash(rc.getMaterials()[0]._effect)
    }
    
    getMaterialHash() {
        return this.getHash(this.material._effect._technique);
    }
}
