import * as THREE from 'three';

const facetex = new THREE.TextureLoader().load('./face.png');
const facemat = new THREE.MeshBasicMaterial({ map: facetex });


function createPlayerMesh(mesh){
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
  pivotlr.position.y = -1.70;
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
  pivotll.position.y = -1.70;
  pivotll.position.x = 0.25;
  mesh.add(head);
  mesh.add(body);
  mesh.add(armr);
  mesh.add(arml);
  mesh.add(pivotlr);
  mesh.add(pivotll);
  mesh.scale.set(0.1, 0.1, 0.1);
}
var playerMesh = new THREE.Group();
createPlayerMesh(playerMesh);

var blocks = {};

var geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
const dirttex = new THREE.TextureLoader().load('./dirt.png');
const dirtmat = new THREE.MeshBasicMaterial({ map: dirttex });
blocks.dirt = new THREE.Mesh( geometry, dirtmat );


module.exports = {playerMesh, blocks};
