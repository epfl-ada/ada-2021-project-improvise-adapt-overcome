function groupBy(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

function renderClusters(data) {
    // CSV processing
    const newspapers = data.map(p => ({
        name: p.journal,
        cluster_id: parseInt(p.cluster_id),
        position: [parseFloat(p.x2), parseFloat(p.y2), parseFloat(p.z2)]
    }));
    console.log(newspapers);
    const cluster_count = new Set(newspapers.map(p => p.cluster_id)).size - data.includes(-1);
    console.log(cluster_count);
    const clusters = groupBy(newspapers, 'cluster_id')

    
    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
    // const controls = new OrbitControls( camera, renderer.domElement );

    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(500, 500);
    document.getElementById("clusters-visualization").appendChild( renderer.domElement );

    var renderCluster = function(cluster_id, newspapers) {
        console.log(cluster_id);
        console.log(newspapers);
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(newspapers.flatMap(np => np.position));
        const material = new THREE.PointsMaterial({color: clusterToRGB(cluster_id, cluster_count), size: 2, sizeAttenuation: false });
        const points = new THREE.Points(geometry, material);
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        points.scale.set(4, 4, 4);
        return points;
    }
    const all_points = Object.entries(clusters).map(group => renderCluster(...group));
    console.log(all_points);
    all_points.forEach(points => scene.add(points));

    camera.position.z = 5;
    renderer.render(scene, camera);

    const animate = function () {
        requestAnimationFrame( animate );

        // controls.update();
        renderer.render( scene, camera );
    };

    animate();
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
