function main() {
    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);

    const createScene = function () {
        const scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 0); // 背景を透明にする

        const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
        camera.setPosition(new BABYLON.Vector3(0, 0, 5));
        camera.lowerRadiusLimit = 2;
        camera.attachControl(canvas, true);
        const light = new BABYLON.PointLight("light", new BABYLON.Vector3(20, 20, 0), scene);
        const sound = new BABYLON.Sound("", "sound/bgm.mp3", scene, null, {loop: true, autoplay: true});
        let animation = true;
        // GLTFファイルを指定する
        const cat = BABYLON.SceneLoader.ImportMesh("", "model.glb", "", scene, function (meshes) {
            const model = meshes[0];
            const animationGroup = scene.animationGroups[0];

            function stopAnimationAtFrame1() {
                if (animationGroup) {
                    animationGroup.pause();
                    animationGroup.goToFrame(1); // フレーム1に移動
                }
            }

            function startAnimation() {
                animation = false;
                if (animationGroup) {
                    animationGroup.goToFrame(59);
                    animationGroup.play(true);
                }
            }

            scene.createDefaultCameraOrLight(true, true, true);
            scene.activeCamera.alpha += Math.PI;

            // 移動処理
            window.addEventListener("keydown", (event) => {
                const speed = 0.1; // 移動速度
                if(animation) startAnimation();
                switch (event.key) {
                    case "s":
                        model.position.x += speed;
                        break;
                    case "w":
                        model.position.x -= speed;
                        break;
                }
            });


            window.addEventListener("keyup", () => {
                animation = true;
                stopAnimationAtFrame1();
            });
        });

        return scene;
    };

    const sample3d = createScene();

    function renderLoop() {
        
        sample3d.render();
        
        
    }

    engine.runRenderLoop(renderLoop);

    window.addEventListener("resize", function () {
        engine.resize();
    });
}
window.addEventListener('DOMContentLoaded', main);