import glmat from 'gl-matrix'
import Cube from './cube/cube'
import Plane from './plane/plane'
import Camera from './camera'
import OrbitControl from './orbitControl'

let mat4 = glmat.mat4
let quat = glmat.quat
let vec3 = glmat.vec3


class Scene {

    constructor(){
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.active = false
        this.time = 0

        this.canvas = document.createElement('canvas')

        this.catchContext()
        this.enableExtension()

        this.camera = new Camera(this, 45)
        this.orbit = new OrbitControl(this)
        this.cube = new Cube(this)
        this.plane = new Plane(this)

    }

    catchContext(){

        document.querySelector('#container').appendChild(this.canvas)
        this.canvas.width = this.width
        this.canvas.height = this.height

        this.gl = this.canvas.getContext('webgl')
        if (this.gl == undefined) { return }
        this.active = true

    }

    enableExtension(){
        this.gl.getExtension('OES_standard_derivatives');
        // this.gl.getExtension('EXT_shader_texture_lod');
    }

    render(){
        
        if (!this.active) { return }        

        this.time += .01        
        let gl = this.gl

        gl.clearColor(0, 0, 0, 1)
        gl.clear( gl.COLOR_BUFFER_BIT )
        gl.viewport(0, 0, this.width, this.height)

        
        this.orbit.update()
        this.camera.update()
        this.camera.lookAt(vec3.fromValues(0, 0, 0))
        this.cube.render()
        this.plane.render()

    }

}
const out = new Scene()
export default out