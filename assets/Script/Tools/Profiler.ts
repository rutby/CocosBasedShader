export default class Profiler {
    //================================================
    static _format2bytes = {
        [cc.Texture2D.PixelFormat.RGB565]: 2, // 565
        [cc.Texture2D.PixelFormat.RGB5A1]: 2, // 5551
        [cc.Texture2D.PixelFormat.RGBA4444]: 2, // 4444
        [cc.Texture2D.PixelFormat.RGB888]: 3, // 888
        [cc.Texture2D.PixelFormat.RGBA8888]: 4, // 8888
        [cc.Texture2D.PixelFormat.RGBA32F]: 4, // 8888
        [cc.Texture2D.PixelFormat.A8]: 1, // 8 -- alpha
        [cc.Texture2D.PixelFormat.I8]: 1, // 8 -- gray
        [cc.Texture2D.PixelFormat.AI88]: 2, // 88 -- alpha & gray
        [cc.Texture2D.PixelFormat.RGB_PVRTC_2BPPV1]: 0.25,
        [cc.Texture2D.PixelFormat.RGBA_PVRTC_2BPPV1]: 0.25,
        [cc.Texture2D.PixelFormat.RGB_A_PVRTC_2BPPV1]: 0.25,
        [cc.Texture2D.PixelFormat.RGB_PVRTC_4BPPV1]: 0.5,
        [cc.Texture2D.PixelFormat.RGBA_PVRTC_4BPPV1]: 0.5,
        [cc.Texture2D.PixelFormat.RGB_A_PVRTC_4BPPV1]: 0.5,
        [cc.Texture2D.PixelFormat.RGB_ETC1]: 0.5,
        [cc.Texture2D.PixelFormat.RGBA_ETC1]: 0.5,
        [cc.Texture2D.PixelFormat.RGB_ETC2]: 0.5,
        [cc.Texture2D.PixelFormat.RGBA_ETC2]: 1,
    };
    
    //================================================
    static dumpTexture() {
        //@ts-ignore
        var cache = cc.loader._cache;
        var result = {};
        var arr = [];
        for(var key in cache) {
            var value = cache[key];
            
            var textures = [];
            if (value._owner instanceof cc.SpriteFrame) { 
                textures.push(value._owner._texture);
            } else if (value._owner instanceof cc.Texture2D) { // when dynamicAtlasManager is enable
                textures.push(value._owner);
            } else if (Array.isArray(value._owner) && value._owner[0] instanceof cc.Texture2D) { // spine
                textures = value._owner;
            } else if (value._owner && value._owner.mainTexture && value._owner.mainTexture instanceof cc.Texture2D) { // jsb packed res
                textures.push(value._owner.mainTexture);
            }
            
            for(var i = 0; i < textures.length; i++) {
                var texture = textures[i];
                var uuid = texture._uuid || texture._id;
                var width = texture.width;
                var height = texture.height;
                var path = this._uuid2path(uuid) || uuid;
                var bytePerPixel = this._format2bytes[texture._format];
                var memSize = width / 1024 * height / 1024 * bytePerPixel;
                if (!result[path]) {
                    result[path] = true;
                    arr.push({
                        path: path,
                        uuid: uuid,
                        width: width,
                        height: height,
                        memSize: memSize,
                    });
                }
            }
        }
        
        arr.sort((a, b) => {
            return b.memSize - a.memSize;
        });
        console.log('=====[dumpTexture]=====', arr);
        
        var total = 0;
        for(var key in arr) {
            total += arr[key].memSize;
            
        }
        console.log('=====[dumpTexture]=====', 'designTotal: ', total.toFixed(2));
        console.log('=====[dumpTexture]=====', 'iosTotal: ', (total * 1.335).toFixed(2));
    }
    
    //================================================
    static _uuid2path(uuid) {
        var target = null;
        //@ts-ignore
        var path2uuid = cc.loader._assetTables.assets._pathToUuid;
        for(var key in path2uuid) {
            var entrys = path2uuid[key];
            entrys = Array.isArray(entrys)? entrys : [entrys];
            for(var i = 0; i < entrys.length; i++) {
                var entry = entrys[i];
                if (entry.uuid == uuid) {
                    target = key;
                    break;
                }
            }
        }
        return target;
    }
}
//@ts-ignore
cc.Profiler = Profiler;
