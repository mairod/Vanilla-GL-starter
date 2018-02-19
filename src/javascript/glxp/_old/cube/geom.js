
const VERTICES = [

    // Front face
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0, 1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, -1.0, -1.0,

    // Top face
    -1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0, 1.0,
    -1.0, -1.0, 1.0,

    // Right face
    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0, 1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, 1.0, -1.0

]

const INDICES = [

    0, 1, 2, 0, 2, 3,         // front
    4, 5, 6, 4, 6, 7,         // back
    8, 9, 10, 8, 10, 11,      // top
    12, 13, 14, 12, 14, 15,   // bottom
    16, 17, 18, 16, 18, 19,   // right
    20, 21, 22, 20, 22, 23    // left

]

const UVS = [
    1, 1, 0,
    0, 1, 0,
    0, 0, 0,
    1, 0, 0,

    0, 1, 1,
    0, 0, 1,
    1, 0, 1,
    1, 1, 1,

    0, 1, 2,
    0, 0, 2,
    1, 0, 2,
    1, 1, 2,

    0, 0, 3,
    1, 0, 3,
    1, 1, 3,
    0, 1, 3,

    0, 1, 4,
    0, 0, 4,
    1, 0, 4,
    1, 1, 4,

    1, 1, 5,
    0, 1, 5,
    0, 0, 5,
    1, 0, 5,

]

export default {
    vertices: VERTICES,
    uvs: UVS,
    indices: INDICES
}