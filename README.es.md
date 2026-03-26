# bkit-doctor

> Una herramienta de línea de comandos para diagnosticar, inicializar y mantener entornos de proyectos al estilo bkit.

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)
[![Version](https://img.shields.io/badge/version-0.4.2-orange.svg)](CHANGELOG.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/wpfhak/bkit-doctor/pulls)

[English](README.md) | [한국어](README.ko.md) | [日本語](README.ja.md) | [中文](README.zh.md) | **Español**

---

## Introducción

**bkit-doctor** es una herramienta de línea de comandos que te ayuda a configurar y mantener un entorno de flujo de trabajo al estilo bkit en cualquier proyecto. Diagnostica la estructura actual de tu proyecto, reporta lo que falta o está mal configurado, y puede generar automáticamente los archivos faltantes de forma segura y no destructiva.

Este proyecto fue construido usando el mismo flujo de trabajo basado en fases que promueve. Cada funcionalidad fue planificada, diseñada, implementada y verificada usando la metodología exacta que bkit-doctor está diseñado a soportar.

---

## Por qué existe este proyecto

Adoptar un flujo de trabajo de desarrollo nativo con IA es poderoso, pero comenzar puede ser intimidante. Configurar manualmente la estructura de directorios correcta, definiciones de agentes, archivos de habilidades, plantillas y políticas es tedioso y propenso a errores.

**bkit-doctor** existe para reducir esa barrera:

- **Diagnosticar** — ver instantáneamente qué está presente, qué falta y qué necesita atención
- **Inicializar** — generar la estructura correcta en segundos, sin sobrescribir nada que ya exista
- **Aplicación selectiva** — aplicar solo lo que necesitas, una pieza a la vez
- **Previsualizar** — ver exactamente qué cambiará antes de que se escriba algo en el disco

Esta herramienta nació de una idea simple: *el flujo de trabajo debe ser fácil de entrar, no solo fácil de usar una vez que estás dentro.*

---

## Características

| Característica | Descripción |
|----------------|-------------|
| `check` | Diagnosticar el entorno del proyecto — pass / warn / fail por elemento |
| `init` | Generar directorios y archivos faltantes de forma no destructiva |
| `--dry-run` | Ver qué se crearía sin tocar el sistema de archivos |
| `--target` | Aplicar solo targets específicos (repetible) |
| `--targets` | Aplicar múltiples targets en un comando (separados por comas) |
| `--overwrite` | Reemplazar archivos existentes cuando sea necesario |
| `--backup` | Hacer copia de seguridad antes de sobrescribir |
| Detección de errores tipográficos | `did you mean: docs-report?` cuando el nombre del target tiene un error |
| Multiplataforma | Funciona en macOS y Windows |

---

## Filosofía del flujo de trabajo

bkit-doctor está construido alrededor de un **modelo de desarrollo basado en fases**:

```
PM → PLAN → DESIGN → DO → CHECK → REPORT
```

Cada fase produce un documento. Cada documento vive en una ubicación predecible. Cada pieza de trabajo es rastreable desde el requisito hasta la implementación y la verificación.

Esta estructura proporciona a los asistentes de IA y a los desarrolladores humanos un contexto compartido y estable. Reduce la ambigüedad, mejora la trazabilidad y hace que las transferencias entre fases sean confiables.

---

## Relación con bkit

> **bkit-doctor es un proyecto independiente. No es un plugin oficial de bkit y no tiene afiliación oficial con el proyecto bkit.**

bkit-doctor fue **inspirado por bkit** — una poderosa herramienta de flujo de trabajo de desarrollo nativo con IA. El autor aprendió sobre la colaboración estructurada con IA a través de los materiales introductorios de bkit, y ese conocimiento influyó directamente en el diseño de esta herramienta.

bkit-doctor:

- **No incluye** código de bkit
- **No requiere** bkit para funcionar
- **No está** respaldado ni mantenido por el equipo de bkit
- Está diseñado para complementar los flujos de trabajo al estilo bkit, no para reemplazar o extender bkit en sí mismo

---

## Agradecimientos

> **Agradecimiento especial al proyecto bkit.**

Ver los videos de introducción de bkit fue un punto de inflexión. La claridad del flujo de trabajo basado en fases, la disciplina de Plan → Design → Do → Check, y la idea de que la colaboración con IA funciona mejor cuando ambas partes comparten un contexto estructurado — estas ideas influyeron profundamente en cómo se diseñó y construyó bkit-doctor.

Gracias a bkit, el autor pudo lograr un vibe coding de alta calidad. Este proyecto existe porque bkit hizo que el desarrollo nativo con IA estructurado pareciera alcanzable. El objetivo de bkit-doctor es ayudar a más desarrolladores a alcanzar esa misma experiencia, de forma más sencilla.

---

## Instalación

### Requisitos

- Node.js >= 18.0.0
- npm

### Instalar globalmente

```bash
npm install -g bkit-doctor
```

### Ejecutar desde el código fuente

```bash
git clone https://github.com/wpfhak/bkit-doctor.git
cd bkit-doctor
npm install
npm link
```

---

## Uso

```bash
bkit-doctor <command> [options]
```

### Inicio rápido

```bash
# Diagnosticar el entorno bkit de tu proyecto
bkit-doctor check

# Ver qué inicializaría, sin cambiar nada
bkit-doctor init --dry-run

# Inicializar la estructura completa
bkit-doctor init

# Inicializar solo partes específicas
bkit-doctor init --target hooks-json --target skills-core
```

---

## Comandos

### `check`

Diagnostica el entorno bkit en el directorio actual (o especificado).

```bash
bkit-doctor check [options]

Options:
  -p, --path <dir>   Directorio objetivo (predeterminado: directorio actual)
```

---

### `init`

Genera archivos y directorios faltantes. No destructivo por defecto — los archivos existentes nunca se sobrescriben a menos que lo solicites explícitamente.

```bash
bkit-doctor init [options]

Options:
  -p, --path <dir>       Directorio objetivo
  --dry-run              Mostrar plan sin escribir nada
  --target <name>        Aplicar solo un target específico (repetible)
  --targets <list>       Lista de targets separados por comas
  --overwrite            Permitir sobrescribir archivos existentes
  --backup               Hacer copia de seguridad antes de sobrescribir
  --backup-dir <dir>     Directorio de copia de seguridad personalizado
```

---

## Licencia

Apache License 2.0 — ver [LICENSE](LICENSE) para los términos completos.
