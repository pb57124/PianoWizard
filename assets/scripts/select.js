// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        pageView: {
            default: null,
            type: cc.PageView
        },
        coverSet: {
            default: null,
            type: cc.Node
        },
        coverPrefab: {
            default: null,
            type: cc.Prefab
        },
        musicInfo: {
            default: null,
            type: cc.Node
        },
        returnBtn: {
            default: null,
            type: cc.Node
        }
    },
    updateMusicInfo: function() {
        let index = this.pageView.getCurrentPageIndex();
        this.musicInfo.children[0].getComponent(cc.Label).string = this.musicList[index].title;
        this.musicInfo.children[1].getComponent(cc.Label).string = this.musicList[index].artist;
    },
    loadMusicList: function() {
        for(let i = 0;i < this.musicList.length;i++) {
            let cover = cc.instantiate(this.coverPrefab);
            cover.on(cc.Node.EventType.TOUCH_END, function() {
                sceneControl.switchScene('select', 'inGame');
            });
            this.pageView.addPage(cover);
            cc.loader.loadRes(`covers/cover${i}`, cc.SpriteFrame, function(err, spriteFrame) {
                this.coverSet.children[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }.bind(this));
        }
        this.pageView.setCurrentPageIndex(gameData.musicId);
    },
    onLoad () {
        sceneControl.fadeIn('select');
        cc.loader.loadRes('musicList', function(err, jsonAssert) {
            this.musicList = jsonAssert.json;
            this.loadMusicList();
            this.updateMusicInfo();
        }.bind(this));
        this.pageView.node.on('page-turning', function() {
            gameData.musicId = this.pageView.getCurrentPageIndex();
        }.bind(this));
        this.returnBtn.on(cc.Node.EventType.TOUCH_END, function() {
            sceneControl.switchScene('select', 'menu');
        });
    },

    start () {
    },

    update (dt) {
        
    },
});
