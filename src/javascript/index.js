import * as TOOLS from './components/tools.class.js'
import Scene from './components/scene'

var framecounter = new TOOLS.FrameRateUI()

// start animating
animate();

function animate() {
    requestAnimationFrame(animate);

    // Updating components
    framecounter.update()
    Scene.render()

}

// console.log("YO !");
