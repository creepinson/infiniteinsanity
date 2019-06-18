import * as THREE from 'three';
import meshes from './meshes';
function World(scene){
  this.scene = scene;
  this.data = { blocks: {}};
  var scope = this;
  this.genTemplate = function(template, options){
    for(var x = 0; x < 16; x++){
      for(var z = 0; z < 16; z++){
        this.data.blocks[x + " " + -0.3 +  " " + z] = "dirt";
        var block = meshes.blocks.dirt;
        block.position.set(x*0.1, -0.3, z*0.1);
        scope.scene.add(block);
      }
    }
  };
}

module.exports = World;
