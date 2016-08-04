function HaloParticleRenderer(particleColor, nParticles, particleTexture, lifetime, startVector, size, initialRadius) {

    this.startVector = startVector;
    this.particleCount = nParticles;

    this.running = true;
    this.clock = new THREE.Clock();
    this.clock.start();

    this.particles = new THREE.Geometry();

    this.material = new THREE.PointsMaterial(
        {
            color: particleColor,
            size: size,
            map: particleTexture,
            blending: THREE.AdditiveBlending,
            transparent: true
        }
    );

    for (var p = 0; p < this.particleCount; p++) {
        var particle = new THREE.Vector3(
            this.startVector.x,
            this.startVector.y,
            this.startVector.z
        );

        var radius = initialRadius;
        var angle = Math.random() * Math.PI * 2;
        particle.x += Math.cos(angle) * radius + Math.random() - 0.5;
        particle.y += (Math.random()-0.5)*2;
        particle.z += Math.sin(angle) * radius + Math.random() - 0.5;

        particle.velocity = particle.clone().sub(this.startVector.clone());

        this.particles.vertices.push(particle);
    }

    this.particleSystem = new THREE.Points(this.particles, this.material);

    // zur Szene hinzufügen
    scene.add(this.particleSystem);

    this.update = function () {

        var time = this.clock.getElapsedTime();
        if (this.running) {

            for (var i = 0; i < this.particles.vertices.length; i++) {
                var particle = this.particles.vertices[i];

                particle.x += particle.velocity.x * 0.1 + (Math.random() - 0.5) * 0.1;
                particle.y += particle.velocity.y * 0.1 + (Math.random() - 0.5) * 0.1;
                particle.z += particle.velocity.z * 0.1 + (Math.random() - 0.5) * 0.1;

                this.particleSystem.geometry.__dirtyVertices = true;
            }

            this.particles.verticesNeedUpdate = true;

            if (time > lifetime) {
                // aufhören

                this.particleSystem.geometry.dispose();
                this.particleSystem.material.dispose();
                scene.remove(this.particleSystem);
                this.particleSystem = undefined;
                this.running = false;
                return false;
            } else {
                // weitermachen
                return true;
            }
        }

    };

}