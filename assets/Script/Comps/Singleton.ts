export class ComponentUtils{
    /**
     * 注册为常驻节点 - 处于安全性考虑, 暂定为当前场景下的常驻节点
     */
    static addPersistRootNode(cmp) {
        var node = new cc.Node();
        var view = node.addComponent(cmp);
        node.parent = cc.director.getScene();
        return view;
    }
}

export default class Singleton {
    private static _instance: any;
    public static getInstance<T>(): T {
        if (!this._instance) {
            this._instance = new this();
        }

        return this._instance;
    };
}

export class ComponentSingleton extends cc.Component {
    private static _instance: any;

    public static getInstance<T>(): T {
        if (!this._instance) {
            this._instance = ComponentUtils.addPersistRootNode(this);
        }

        return this._instance;
    };
}