const VERTICES = []
const RANDOM = []

let time = 0

class Scene {

    constructor(){
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.active = false

        this.pointDensity = 100

        this.canvas = document.createElement('canvas')

        this.catchContext()
        this.computeVertices()
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

    computeVertices(){

        // for (var i = 0; i < this.pointDensity; i++) {
        //     for (var j = 0; j < this.pointDensity; j++) {
        //         VERTICES.push((((1 / this.pointDensity) * i) - .5) * 2)
        //         VERTICES.push((((1 / this.pointDensity) * j) - .5) * 2)
        //         VERTICES.push(0)
        //     }
        // }

        let count = 10000

        for (var i = 0; i < count; i++) {
            let angle = Math.random() * 2 * Math.PI
            let dist = (i / count)
            VERTICES.push(Math.cos(angle) * dist * .8)
            VERTICES.push(Math.sin(angle) * dist * .8)
            VERTICES.push(0)
        }

        for (var i = 0; i < count; i++) {
            RANDOM.push((Math.random() - .5) * 2)
            RANDOM.push((Math.random() - .5) * 2)
            RANDOM.push(0)
        }

        console.log(RANDOM);
        
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

        shaderProgram.randomPositionAttribute = gl.getAttribLocation(shaderProgram, "aPosRand");
        gl.enableVertexAttribArray(shaderProgram.randomPositionAttribute)

        shaderProgram.timeUniform = gl.getUniformLocation(shaderProgram, "uTime")

        this.vertShader = vertSahder
        this.fragSahder = fragSahder
        this.program = shaderProgram

    }

    initBuffer(){

        let gl = this.gl

        let vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(VERTICES), gl.STATIC_DRAW)

        let randomPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, randomPositionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(RANDOM), gl.STATIC_DRAW)

        this.vertexPositionBuffer = vertexPositionBuffer
        this.randomPositionBuffer = randomPositionBuffer

    }

    render(){
        
        if (!this.active) { return }    
        time += .01    

        let gl = this.gl

        gl.clearColor(0, 0, 0, 1)
        gl.clear( gl.COLOR_BUFFER_BIT )

        gl.viewport(0, 0, this.width, this.height)

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer)
        gl.vertexAttribPointer(this.program.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0)

        gl.bindBuffer(gl.ARRAY_BUFFER, this.randomPositionBuffer)
        gl.vertexAttribPointer(this.program.randomPositionAttribute, 3, gl.FLOAT, false, 0, 0)
                
        gl.uniform1f(this.program.timeUniform, time)
        gl.drawArrays(gl.POINTS, 0, VERTICES.length / 3)


    }

}
const out = new Scene()
export default out