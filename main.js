// вершинный шейдер
var VSHADER_SOURCE = 
'attribute vec4 a_Position;\n' + 
'uniform vec4 u_Translation;\n' + 
'\n' + 
'void main() {\n' + 
'	gl_Position = a_Position + u_Translation;\n' + 
'}\n';

// фрагментный шейдер
var FSHADER_SOURCE = 
'precision mediump float;\n' + 
'void main() {\n' + 
'	gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n' + 
'}\n';

function main() {
	var dx = 0.3,
	 	dy = 0.3,
	 	dz = 0.0;

	var canvas = document.getElementById('example');
	var gl = getWebGLContext(canvas);
	initShaders(gl, VSHADER_SOURCE , FSHADER_SOURCE);
	
	var n = initVertexBuffers(gl);

	var u_Translation = gl.getUniformLocation(gl.program , 'u_Translation');
	gl.uniform4f(u_Translation, dx , dy , dz , 0.0);

	gl.clearColor(0.0 , 0.0 , 0.0 , 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.drawArrays(gl.TRIANGLES , 0 , n);
}

function initVertexBuffers(gl) {
	var verticles = new Float32Array([
		0.0 , 0.5 , -0.5 , -0.5 , 0.5 , -0.5
	]);
	var n = 3;

	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER , vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER , verticles , gl.STATIC_DRAW);
	
	var a_Position = gl.getAttribLocation(gl.program , 'a_Position');
	
	gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(a_Position);

	return n;
}