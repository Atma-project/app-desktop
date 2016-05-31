module.exports = {
  //Wave
    "system1": {
        "index": 1,
        "elevation": 0.2,
        "noise_range": 0.8,
        "sombrero_amplitude": 0,
        "sombrero_frequency": 1,
        "speed": 1,
        "segments": 324,
        "wireframe_color": "#3D8C8C",
        "perlin_passes": 0,
        "wireframe": false,
        "floor_visible": false,
        "position": {
          "x": 1.0,
          "y": 4.0,
          "z": 24.0
        },
        "minIntensity": 0.1,
        "intensity": 3.0
    },

    // Floor
    "system2": {
        "index": 2,
        "elevation": 0.2,
        "noise_range": 0.8,
        "sombrero_amplitude": 0,
        "sombrero_frequency": 1,
        "speed": 1,
        "segments": 324,
        "wireframe_color": "#224acd",
        "perlin_passes": 0,
        "wireframe": false,
        "floor_visible": false,
        "position": {
          "x": 1.0,
          "y": 4.0,
          "z": -3.0
        },
        "minIntensity": 0.1,
        "intensity": 2.0
    },

    //Mountain
    "system3": {
        "index": 3,
        "elevation": 1.5,
        "noise_range": 1.7,
        "sombrero_amplitude": 0,
        "sombrero_frequency": 1,
        "speed": 1,
        "segments": 324,
        "wireframe_color": "#224acd",
        "perlin_passes": 3,
        "wireframe": false,
        "floor_visible": false,
        "position": {
          "x": 0.0,
          "y": 10.0,
          "z": 0.0
        },
        "minIntensity": 0.1,
        "intensity": 3.0
    }
}
