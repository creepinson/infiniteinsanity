import * as THREE from "three";
export class Entity {
  constructor(pos = new THREE.Vector3()) {
    this.transform = new THREE.Object3D();
    this.transform.position.set(pos.x, pos.y, pos.z);
  }

  update() {}
}
