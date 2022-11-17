import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import * as dat from 'dat.gui';
import {CSS3DObject, CSS3DRenderer} from 'three/examples/jsm/renderers/CSS3DRenderer';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'tb-three-main',
  templateUrl: './three-main.component.html',
  styleUrls: ['./three-main.component.scss']
})
export class ThreeMainComponent implements OnInit {
  @ViewChild('THREE', {static: true}) threeDom!: ElementRef;

  private scene!: THREE.Scene;
  private orbit!: OrbitControls;
  private cubeLoader!: THREE.CubeTextureLoader;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private labelRenderer!: CSS3DRenderer;
  private orbitControls!: OrbitControls;
  private css3DObject!: CSS3DObject;
  private rainy!: () => void;
  private snowy!: () => void;
  private sunny!: () => void;
  private cloudy!: () => void;
  private flame!: () => void;
  private rainySw = 3; // 1雨2雪3晴4阴
  private flameSw = true;
  private gui!: dat.GUI;
  private cloud!: THREE.Points;
  private texture!: THREE.Texture;

  private fov = 65;
  private near = 0.1;
  private far = 20000;
  private readonly domWidth!: number;
  private readonly domHeight!: number;

  // 初始化一个空容器，装载粒子
  private krq!: THREE.Object3D;
  private group3!: THREE.Group;

  private urls = [
    'assets/textures/posx.jpg',
    'assets/textures/negx.jpg',
    'assets/textures/posy.jpg',
    'assets/textures/negy.jpg',
    'assets/textures/posz.jpg',
    'assets/textures/negz.jpg'
  ];
  private urls1 = [
    'assets/textures/posx_gray.jpg',
    'assets/textures/negx_gray.jpg',
    'assets/textures/posy_gray.jpg',
    'assets/textures/negy_gray.jpg',
    'assets/textures/posz_gray.jpg',
    'assets/textures/negz_gray.jpg'
  ];

  constructor(@Inject(DOCUMENT) private doc: Document) {
    this.domHeight = document.getElementsByTagName('mat-sidenav-content')[0].clientHeight
      - document.getElementsByTagName('mat-toolbar')[0].clientHeight;
    this.domWidth = document.getElementsByTagName('mat-sidenav-content')[0].clientWidth;
  }

  ngOnInit(): void {
    this.init();
    this.initEarth();
    window.addEventListener('resize', this.onResize.bind(this), false);
    this.initTexture();
  }

  private init() {
    // 创建一个场景，它将包含我们所有的元素，如物体，相机和灯光。
    this.scene = new THREE.Scene();

    this.cubeLoader = new THREE.CubeTextureLoader();
    this.scene.background = this.cubeLoader.load(this.urls);

    // 创建一个摄像机，它定义了我们正在看的地方
    // this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 20000);
    this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, this.near, this.far);
    // 将摄像机对准场景的中心0
    this.camera.position.x = 180;
    this.camera.position.y = 80;
    this.camera.position.z = 90;
    this.camera.lookAt(this.scene.position);
    // this.orbit = new OrbitControls(this.camera);

    // 创建一个渲染器并设置大小，WebGLRenderer将会使用电脑显卡来渲染场景
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true,
    });
    this.renderer.setClearColor(new THREE.Color(0x121A39));
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setSize(this.domWidth, this.domHeight);

    /* 环境光, 环境光不能用来投射阴影，因为它没有方向 */
    const ambient = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambient);

    const point = new THREE.PointLight(0x666665);
    point.position.set(220, 330, 300); // 点光源位置
    this.scene.add(point); // 点光源添加到场景中

    const directionalLight = new THREE.DirectionalLight(0x777777, 0.5);
    this.scene.add(directionalLight);

    this.threeDom.nativeElement.appendChild(this.renderer.domElement); // body元素中插入canvas对象

    this.labelRenderer = new CSS3DRenderer();
    // this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.setSize(this.domWidth, this.domHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';

    this.threeDom.nativeElement.appendChild(this.labelRenderer.domElement);

    this.orbitControls = new OrbitControls(this.camera, this.threeDom.nativeElement);
    this.orbitControls.update();
    this.threeDom.nativeElement.addEventListener('click', this.onMouseClick.bind(this));

    this.addCSS3DLabelToScene();
  }

  private initEarth() {
    const loader = new GLTFLoader();
    loader.load('assets/models/example3.glb', (obj) => {
      // console.log(obj);
      // 获取模型，并添加到场景
      const model = obj.scene;
      this.scene.add(model);

      model.scale.set(1, 1, 1);
    });
  }

  // 随着窗体的变化修改场景
  private onResize(e: Event) {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setSize(this.domWidth, this.domHeight);
  }

  private render() {
    requestAnimationFrame(this.render.bind(this)); /* 周期性执行渲染函数animate */
    this.orbitControls.update();
    this.labelRenderer.render(this.scene, this.camera);
    this.renderer.render(this.scene, this.camera); /* 执行渲染 */
  }

  // 这里的代码作用是把红色文字内容加入白框里
  private modifyDocument(id: any, color: any, value: any) {
    const dom = document.getElementById(id);
    if (dom) {
      dom.style.color = color;
      dom.textContent = value;
    }
  }

  private addCSS3DLabelToScene() {
    const element = document.getElementById('WebGL-output');

    // 把生成的CSSDOM对象处理成three的节点对象
    this.css3DObject = new CSS3DObject(element);
    // 设置CSS3DObject对象
    this.css3DObject.position.x = 0;
    this.css3DObject.position.y = 0;
    this.css3DObject.position.z = 0;
    // 在第二个场景中添加这个对象
    this.scene.add(this.css3DObject);
    // 默认不显示
    this.css3DObject.visible = false;
  }

  private onMouseClick(event: any) {
    // console.log('===');
    const mousePoint = new THREE.Vector2();
    // mousePoint.x = (event.clientX / window.innerWidth) * 2 - 1;
    // mousePoint.y = -(event.clientY / window.innerHeight) * 2 + 1;
    mousePoint.x = (event.clientX / this.domWidth) * 2 - 1;
    mousePoint.y = -(event.clientY / this.domHeight) * 2 + 1;
    const rayCaster = new THREE.Raycaster();
    rayCaster.setFromCamera(mousePoint, this.camera);
    const intersects = rayCaster.intersectObjects(this.scene.children, true);
    // console.log(intersects);
    if (intersects.length > 0) {
      this.css3DObject.visible = true;
      this.css3DObject.position.x = intersects[0].object.position.x - 50 + 18;
      this.css3DObject.position.y = intersects[0].object.position.y + 50 + 38;
      this.css3DObject.position.z = intersects[0].object.position.z;
      this.css3DObject.rotation.y = Math.PI / 2; // 直接设置旋转属性，例如围绕y轴旋转-90度
      this.modifyDocument('lableTitleWarning', 'red', '户号:2702燃气浓度超标！');
      this.modifyDocument('lableTitleTemperature', 'red', '业主电话: 13031008900');
    } else {
      // css3DObject.visible = false;
    }
  }

  private initTexture() {
    this.texture = new THREE.TextureLoader().load('assets/models/t64.png', () => {
      // THREE.RepeatWrapping允许纹理重复
      this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
      this.texture.repeat.set(8, 1);
      this.texture.needsUpdate = true;

      const material = new THREE.MeshBasicMaterial({
        map: this.texture,
        side: THREE.BackSide,
        transparent: true
      });
      // this.render();

      const animate = () => {
        if (this.texture) {
          this.texture.offset.x -= 0.1;
        }
        requestAnimationFrame(animate.bind(this));
        this.render();
      };

      // 创建顶点数组
      let points1 = [new THREE.Vector3(100, 2, -131),
        new THREE.Vector3(99, 2, -32.219),
      ];
      let points2 = [new THREE.Vector3(99, 2, -32.219),
        new THREE.Vector3(13.548, 2, -33),
      ];
      let points3 = [new THREE.Vector3(13.548, 2, -33),
        new THREE.Vector3(11.87, 2, 68),
      ];
      // CatmullRomCurve3创建一条平滑的三维样条曲线
      const curve1 = new THREE.CatmullRomCurve3(points1); // 曲线路径
      points1 = curve1.getPoints(50);

      const curve2 = new THREE.CatmullRomCurve3(points2); // 曲线路径
      points2 = curve2.getPoints(50);

      const curve3 = new THREE.CatmullRomCurve3(points3); // 曲线路径
      points3 = curve3.getPoints(50);

      // 创建管道
      const tubeGeometry1 = new THREE.TubeGeometry(curve1, 80, 1);
      const mesh1 = new THREE.Mesh(tubeGeometry1, material);

      const tubeGeometry2 = new THREE.TubeGeometry(curve2, 80, 1);
      const mesh2 = new THREE.Mesh(tubeGeometry2, material);

      const tubeGeometry3 = new THREE.TubeGeometry(curve3, 80, 1);
      const mesh3 = new THREE.Mesh(tubeGeometry3, material);


      this.scene.add(mesh1);
      this.scene.add(mesh2);
      this.scene.add(mesh3);

      // this.render();
      animate();
    });
  }


}
