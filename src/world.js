import * as THREE from 'three';
import meshes from './meshes';
function World(scene){
  this.scene = scene;
  this.data = { blocks: {}};
  var scope = this;
  this.genTemplate = function(template, options){
    for(var x = 0; x < 16; x++){
      for(var z = 0; z < 16; z++){
        this.data.blocks[x + " " + 0 +  " " + z] = "dirt";
        var block = meshes.blocks.dirt.clone();
        block.position.set(x, 1, z);
        scope.scene.add(block);
      }
    }
  };
}

module.exports = World;
