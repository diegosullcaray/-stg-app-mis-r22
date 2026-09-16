# Strategos R22 · MIS

SPA de mantenimiento activo con Angular 14, TypeScript 4.6 y RxJS 6. `stg` significa **Strategos**. Este repositorio contiene el frontend y consume un backend existente.

- [Guía de incorporación](docs/guides/onboarding.md): estructura, ejecución, configuración, integraciones y alcance de IA.
- [Índice documental](docs/README.md): rutas de lectura por tarea.
- [Reglas del repositorio](AGENTS.md): contratos, alcance y validación.

Sigue la guía antes de instalar dependencias. `npm start` inicia Angular en `http://localhost:4200/`; login y datos requieren configuración y conectividad autorizadas al backend real.

La validación habitual usa TypeScript, controles focalizados y `git diff --check`. Build, Karma y lint se ejecutan solo bajo las condiciones de AGENTS.md, nunca como compilaciones concurrentes. No hacer commit, push ni despliegue sin solicitud explícita.
