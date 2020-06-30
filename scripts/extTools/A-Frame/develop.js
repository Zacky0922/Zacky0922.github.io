
//軸表示
function setAxis(id) {
    document.getElementById(id).innerHTML = ""+
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