function ExplosionParticleRenderer(particleColor, nParticles, particleTexture, lifetime, startVector, speed, size) {

    this.running = true;
    this.clock = new THREE.Clock();
    this.clock.start();

    this.speed = speed;

    this.startVector = startVector;
    this.particleCount = nParticles;
    this.particles = new THREE.Geometry();

    // Material erstellen
    this.material = new THREE.PointsMaterial(
        {
            color: particleColor,
            size: size,
            map: particleTexture,
            blending: THREE.AdditiveBlending,
            transparent: true
        }
    );

    // Particles initial erstellen (am Startvektor) mit Velocity (zum Endvektor)
    for (var p = 0; p < this.particleCount; p++) {
        var particle = new THREE.Vector3(
            this.startVector.x,
            this.startVector.y,
            this.startVector.z
        );

        particle.x += Math.random() - 0.5;
        particle.y += Math.random() - 0.5;
        particle.z += Math.random() - 0.5;

        particle.velocity = new THREE.Vector3(
            0, 0, 0 // TODO
        );
        this.particles.vertices.push(particle);
    }

    this.particleSystem = new THREE.Points(this.particles, this.material);

    // zur Szene hinzufügen
    scene.add(this.particleSystem);

    this.update = function () {

        if (this.running) {

            var pCount = this.particleCount;

            while (pCount--) {
                var particle = this.particles.vertices[pCount];

                particle.velocity.x += (Math.random() - 0.5) * this.speed;
                particle.velocity.y += (Math.random() - 0.5) * this.speed;
                particle.velocity.z += (Math.random() - 0.5) * this.speed;

                particle.x += particle.velocity.x;
                particle.y += particle.velocity.y;
                particle.z += particle.velocity.z;

                this.particleSystem.geometry.__dirtyVertices = true;
            }

            this.particles.verticesNeedUpdate = true;

            var time = this.clock.getElapsedTime();

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