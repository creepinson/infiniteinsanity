import * as THREE from "three";
import { Entity } from "./entity";

export class Player extends Entity {
    constructor(pos) {
        super(pos);
        this.mesh = new THREE.Group();
        // Crea21ate the mesh parts and apply the textures
        createPlayerMesh(this.mesh);
        this.transform.add(this.mesh);
    }

    update() {
        
    }
}

const facetex = new THREE.TextureLoader().load("./assets/face.png");
const facemat = new THREE.MeshBasicMaterial({ map: facetex });

function createPlayerMesh(transform) {
  var mat = new THREE.MeshBasicMaterial({ color: 0xd6a048 });
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var materials = [
    mat,
    mat,
    mat,
    mat,
    facemat, // front
    mat,
  ];
  var head = new THREE.Mesh(geometry, materials);

  var mat = new THREE.MeshBasicMaterial({ color: 0xd6a048 });
  geometry = new THREE.BoxGeometry(1, 1.45, 0.45);
  var materials = [
    mat,
    mat,
    mat,
    mat,
    mat, // front
    mat,
  ];
  var body = new THREE.Mesh(geometry, materials);
  body.position.y = -1.25;

  var mat = new THREE.MeshBasicMaterial({ color: 0xd6a048 });
  geometry = new THREE.BoxGeometry(0.5, 1.45, 0.5);

  var materials = [
    mat,
    mat,
    mat,
    mat,
    mat, // front
    mat,
  ];
  var armr = new THREE.Mesh(geometry, materials);
  armr.position.y = -1.25;
  armr.position.x = -0.75;

  var mat = new THREE.MeshBasicMaterial({ color: 0xd6a048 });
  geometry = new THREE.BoxGeometry(0.5, 1.45, 0.5);
  var materials = [
    mat,
    mat,
    mat,
    mat,
    mat, // front
    mat,
  ];
  var arml = new THREE.Mesh(geometry, materials);
  arml.position.y = -1.25;
  arml.position.x = 0.75;

  var mat = new THREE.MeshBasicMaterial({ color: 0xd6a048 });
  geometry = new THREE.BoxGeometry(0.5, 1.45, 0.5);

  var materials = [
    mat,
    mat,
    mat,
    mat,
    mat, // front
    mat,
  ];
  var legr = new THREE.Mesh(geometry, materials);
  legr.position.y = -1;
  var pivotlr = new THREE.Group();
  pivotlr.add(legr);
  pivotlr.position.y = -1.7;
  pivotlr.position.x = -0.25;
  mat = new THREE.MeshBasicMaterial({ color: 0xd6a048 });
  geometry = new THREE.BoxGeometry(0.5, 1.45, 0.5);

  var materials = [
    mat,
    mat,
    mat,
    mat,
    mat, // front
    mat,
  ];
  var legl = new THREE.Mesh(geometry, materials);
  legl.position.y = -1;
  var pivotll = new THREE.Group();
  pivotll.add(legl);
  pivotll.position.y = -1.7;
  pivotll.position.x = 0.25;
  transform.add(head);
  transform.add(body);
  transform.add(armr);
  transform.add(arml);
  transform.add(pivotlr);
  transform.add(pivotll);
  transform.scale.set(0.1, 0.1, 0.1);
}