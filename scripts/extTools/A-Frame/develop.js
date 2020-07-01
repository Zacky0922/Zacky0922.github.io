
//軸表示
function setAxis(id) {
    document.getElementById(id).innerHTML = "" +
        '<!--Point of Origin-->' +
        '<a-sphere position="0 0 0" radius="0.1" color="#000" wireframe="true"></a-sphere>' +
        '<!-- X-axis -->' +
        '<a-cylinder color="#f00" radius="0.01" rotation="0 0 90" position="0.5 0 0"></a-cylinder>' +
        '<a-cone color="#f00" radius-bottom="0.1" height="0.1" rotation="0 0 -90" position="1 0 0"></a-cone>' +
        '<!-- Y-axis -->' +
        '<a-cylinder color="#0F0" radius="0.01" rotation="0 0 0" position="0 0.5 0"></a-cylinder>' +
        '<a-cone color="#0f0" radius-bottom="0.1" height="0.1" rotation="0 0 0" position="0 1 0"></a-cone>' +
        '<!-- Z-axis -->' +
        '<a-cylinder color="#00f" radius="0.01" rotation="90 0 0" position="0 0 0.5"></a-cylinder>' +
        '<a-cone color="#00f" radius-bottom="0.1" height="0.1" rotation="90 0 0" position="0 0 1"></a-cone>' +
        '<!-- unit box -->' +
        '<a-box color="#000" wireframe="true"></a-box>';
}

// FPS処理
let z_Aframe_fps_oldtime = new Date();
function getFPS() {
    //前回描画時からのmsec差分を取得
    let fps_newtime = new Date();
    let d = fps_newtime.getTime() - z_Aframe_fps_oldtime.getTime();
    z_Aframe_fps_oldtime = fps_newtime;
    // FPS = 1000 / d
    return 1000 / d;
}


//カメラ制御系
//カメラ位置
let camera_pos_polar = [5, 0];   //極座標(r,θ)
let camera_pos_cartesian = [0, 0];  //直交座標
const camera_speed = 3;
function camera_cycleRender() {
    let camera_wrap = document.getElementById("z-camera-wrap");
    let r = camera_pos_polar[0];
    //場所を回す
    camera.setAttribute("position",
        r * Math.cos(camera_pos_polar[1]) +
        " 0.35 " +
        r * Math.sin(camera_pos_polar[1]));
    //中心を向く
    camera.setAttribute("rotation", "" + "0 " +
        ((Math.PI / 2 - camera_pos_polar[1]) / Math.PI * 180) +
        " 0");
    //角度更新
    camera_pos_polar[1] += 2 * Math.PI / (5 * getFPS());	// n秒で2pi = n * FPS で1週
    if (camera_pos_polar[1] > 2 * Math.PI) {
        camera_pos_polar[1] -= 2 * Math.PI;
    }
    requestAnimationFrame(camera_cycleRender);
}

function camera_walkingRender() {
    let camera_wrap = document.getElementById("z-camera-wrap");
    let camera = document.getElementById("z-camera");
    let pos = camera_wrap.getAttribute("position");
    let rot = camera.getAttribute("rotation");
    let fps = getFPS();
    console.log(rot);
    //左右回転のオーバーフローを避ける
    if (rot.y >= 360) {
        rot.y -= 360;
        camera.setAttribute("rotation", rot);
    } else if (rot.y <= -360) {
        rot.y += 360;
        camera.setAttribute("rotation", rot);
    }
    //上下：-90≦rot.x≦90
    if (rot.x < -15) {
        pos.x -= Math.sin(rot.y / 180 * Math.PI) / (camera_speed * fps);
        pos.z -= Math.cos(rot.y / 180 * Math.PI) / (camera_speed*fps);
    }
    //rot.y += 1;
    camera_wrap.setAttribute("position", pos);
    requestAnimationFrame(camera_walkingRender);
}