var vertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec3 vertPosition;',
'attribute vec3 vertColor;',
'varying vec3 fragColor;',
'uniform mat4 mWorld;',
'uniform mat4 mView;',
'uniform mat4 mProj;',
'',
'void main()',
'{',
'   fragColor = vertColor;',
'   gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
'}'
].join('\n');

var fragmentShaderText = 
[
'precision mediump float;',
'varying vec3 fragColor;',
'',
'void main()',
'{',
'   gl_FragColor = vec4(fragColor, 1.0);',
'}',
].join('\n');

var gl;

var InitDemo = function () 
{
    console.log("This is working");

    var canvas = document.getElementById('game-surface');
    gl = canvas.getContext('webgl');

    if (!gl)
    {
        console.log('WebGL not supported. Falling back on experimental-WebGL')
        gl = canvas.getContext('experimental-webgl');
    }

    if (!gl)
    {
        alert('Your browser is borked');
    }

    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // gl.viewport(0, 0, window.innerWidth, window.innerHeight);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);

    //create shaders
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);
    
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
    {
        console.error('Error compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
        return;
    }

    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
    {
        console.error('Error compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
        return;
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    {
        console.error('Error linking shaders!', gl.getProgramInfoLog(program));
        return;
    }

    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
    {
        console.error('Error validating program!', gl.getProgramInfoLog(program))
    }


    //Create Buffer
    var boxVertices = 
    [ // X, Y, Z           R, G, B
        // Top
        -1.0, 1.0, -1.0,   0.0, 0.0, 1.0,
        -1.0, 1.0, 1.0,    0.0, 0.0, 1.0,
        1.0, 1.0, 1.0,     0.0, 0.0, 1.0,
        1.0, 1.0, -1.0,    0.0, 0.0, 1.0,

        // Left
        -1.0, 1.0, 1.0,    0.0, 1.0, 0.0,
        -1.0, -1.0, 1.0,   0.0, 1.0, 0.0,
        -1.0, -1.0, -1.0,  0.0, 1.0, 0.0,
        -1.0, 1.0, -1.0,   0.0, 1.0, 0.0,

        // Right
        1.0, 1.0, 1.0,    1.0, 0.0, 0.0,
        1.0, -1.0, 1.0,   1.0, 0.0, 0.0,
        1.0, -1.0, -1.0,  1.0, 0.0, 0.0,
        1.0, 1.0, -1.0,   1.0, 0.0, 0.0,

        // Front
        1.0, 1.0, 1.0,    0.0, 1.0, 1.0,
        1.0, -1.0, 1.0,    0.0, 1.0, 1.0,
        -1.0, -1.0, 1.0,    0.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,    0.0, 1.0, 1.0,

        // Back
        1.0, 1.0, -1.0,    1.0, 1.0, 0.0,
        1.0, -1.0, -1.0,    1.0, 1.0, 0.0,
        -1.0, -1.0, -1.0,    1.0, 1.0, 0.0,
        -1.0, 1.0, -1.0,    1.0, 1.0, 0.0,

        // Bottom
        -1.0, -1.0, -1.0,   1.0, 0.0, 1.0,
        -1.0, -1.0, 1.0,    1.0, 0.0, 1.0,
        1.0, -1.0, 1.0,     1.0, 0.0, 1.0,
        1.0, -1.0, -1.0,    1.0, 0.0, 1.0,
    ];

    var boxIndices =
    [
        // Top
        0, 1, 2,
        0, 2, 3,

        // Left
        5, 4, 6,
        6, 4, 7,

        // Right
        8, 9, 10,
        8, 10, 11,

        // Front
        13, 12, 14,
        15, 14, 12,

        // Back
        16, 17, 18,
        16, 18, 19,

        // Bottom
        21, 20, 22,
        22, 20, 23
    ];


    var boxVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

    var boxIndexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl.STATIC_DRAW);


    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');

    gl.vertexAttribPointer(
        positionAttribLocation, //Attribute Location    
        3,  //number of elements per attribute
        gl.FLOAT, // type of elements
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT,//size of an individual vertext
        0 //offset from the beginning of a single vertex to this attribute
    );

    gl.vertexAttribPointer(
        colorAttribLocation, //Attribute Location    
        3,  //number of elements per attribute
        gl.FLOAT, // type of elements
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT,//size of an individual vertext
        3 * Float32Array.BYTES_PER_ELEMENT //offset from the beginning of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    //Tell OpenGL state machine which program should be active 
    gl.useProgram(program);

    var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
    var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');
    
    var worldMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projMatrix = new Float32Array(16);
    mat4.identity(worldMatrix);
    mat4.lookAt(viewMatrix, [0, 0, -8], [0, 0, 0], [0, 1, 0]);
    mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);

    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

    var xRotationMatrix = new Float32Array(16);
    var yRotationMatrix = new Float32Array(16);

    //main render loop
    var identityMatrix = new Float32Array(16);
    mat4.identity(identityMatrix);
    var angle = 0;
    var loop = function () 
    {
        var angle = performance.now() / 1000 / 6 * 2 * Math.PI; //speed of rotation set here
        mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]);
        mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
        mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix);
        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
        
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0);
        
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

};