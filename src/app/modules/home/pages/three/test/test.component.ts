import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'tb-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  @ViewChild('THREE', {static: true}) three!: ElementRef;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  private renderer = new THREE.WebGLRenderer();
  private geometry = new THREE.BoxGeometry(1,1,1);
  private material = new THREE.MeshBasicMaterial({color: 0x00ff00});
  private cube = new THREE.Mesh( this.geometry, this.material);

  constructor() { }

  ngOnInit(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.three.nativeElement.appendChild( this.renderer.domElement );

    this.scene.add(this.cube);
    this.camera.position.z= 5;

    this.animate();
  }

  private animate(){
    requestAnimationFrame(this.animate.bind(this));
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render( this.scene, this.camera);
  }

}
