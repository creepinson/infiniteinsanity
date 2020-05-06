import * as THREE from "three";
import * as blockData from "./data/blocks.json";

var blocks = {};

// Loop through each block in json object
for (let key in blockData) {
  if (!blockData.hasOwnProperty(key) || key == "default") continue;
  console.log(`Processing ${key}`)
  let b = blockData[key];

  // Create block geometry
  let geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  let material;

  // If there is a material defined, and if so then process the material object
  if (b.material) {
    /* 
            If there is a material with a type of basic 
            or a type that is not defined in the material object,
            continue to check for any texture mappings.
        */
    if (
      !b.material.type ||
      b.material.type == "" ||
      b.material.type == "basic"
    ) {
      if (b.material.texture)
        material = new THREE.MeshBasicMaterial({ map: b.material.texture });
    }
  } else {
    // The material is not defined, default to blank white block.
    material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  }

  // Assign the new block's mesh to the name of the block
  blocks[key] = new THREE.Mesh(geometry, material);
}

module.exports = { blocks };
