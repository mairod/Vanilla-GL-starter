const VERTICES = [
    0, 0, 0
]

class Scene {

    constructor(){
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.active = false

        this.canvas = document.createElement('canvas')

        this.catchContext()
        this.initProgram()
        this.initBuffer()


    }

    catchContext(){

        document.querySelector('#container').appendChild(this.canvas)
        this.canvas.width = this.width
        this.canvas.height = this.height

        this.gl = this.canvas.getContext('webgl')
        if (this.gl == undefined) { return }
        this.active = true

    }

    initProgram(){

        let vert = require('../../shaders/point.vert')
        let frag = require('../../shaders/point.frag')

        let gl = this.gl

        let vertSahder = gl.createShader(gl.VERTEX_SHADER)
        gl.shaderSource(vertSahder, vert)
        gl.compileShader(vertSahder)

        let fragSahder = gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(fragSahder, frag)
        gl.compileShader(fragSahder)
        
        if (!gl.getShaderParameter(vertSahder, gl.COMPILE_STATUS)) {
            console.error('error vert', gl.getShaderInfoLog(vertSahder))
            return null
        }

        if (!gl.getShaderParameter(fragSahder, gl.COMPILE_STATUS)) {
            console.error('error frag', gl.getShaderInfoLog(fragSahder))
            return null
        }

        let shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertSahder)
        gl.attachShader(shaderProgram, fragSahder)
        gl.linkProgram(shaderProgram)

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(shaderProgram)

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aPos");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute)

        this.vertShader = vertSahder
        this.fragSahder = fragSahder
        this.program = shaderProgram

    }

    initBuffer(){

        let gl = this.gl

        let vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(VERTICES), gl.STATIC_DRAW)

        this.vertexPositionBuffer = vertexPositionBuffer

    }

    render(){
        
        if (!this.active) { return }        

        let gl = this.gl

        gl.clearColor(0, 0, 0, 1)
        gl.clear( gl.COLOR_BUFFER_BIT )

        gl.viewport(0, 0, this.width, this.height)

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(this.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0)
        gl.drawArrays(gl.POINTS, 0, 1)


    }

}
const out = new Scene()
export default out