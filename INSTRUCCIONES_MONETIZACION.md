# Guía de Monetización y Seguridad Legal: NexusStore

¡Felicidades! Tienes una plataforma digital premium completamente funcional y lista para operar. Esta guía te explica detalladamente cómo utilizar **NexusStore** para generar ingresos de forma 100% legal, segura y minimizando riesgos.

---

## 1. ¿Cómo te da dinero esta tienda?

Una plataforma de software por sí misma no genera dinero automáticamente; es un canal. Para monetizarla con éxito, debes ofrecer **productos digitales de valor real** que la gente esté dispuesta a pagar.

### Ideas de productos digitales rentables:
*   **Plantillas de Notion/Excel**: Para organizar la productividad, finanzas, nutrición o estudios.
*   **Guías y Ebooks prácticos**: Escribe sobre temas que domines o utiliza herramientas de Inteligencia Artificial para redactar guías especializadas (ej. *Guía de Automatización con ChatGPT para PyMEs*).
*   **Recursos de diseño (Assets)**: Paquetes de iconos 3D, plantillas para Canva, tipografías o presets de Lightroom para fotógrafos.
*   **Código o Plantillas Web**: Scripts útiles, plugins o temas para WordPress/HTML.

### El flujo del dinero:
1. Sube tu tienda a internet (ver Sección 4).
2. El cliente entra en tu web, ve el producto y pulsa "Comprar".
3. Rellena sus datos bancarios en la pasarela de pago cifrada.
4. El dinero va **directamente a tu cuenta bancaria** (procesado de forma segura por Stripe).
5. La web entrega el archivo descargable al cliente de forma instantánea y automática.

---

## 2. Cómo conectar pagos reales (Stripe) en 5 minutos

Actualmente la tienda funciona en **modo simulado** (ideal para demostraciones y pruebas de usuario). Para aceptar cobros con tarjeta de crédito reales:

1.  **Crea una cuenta en Stripe**: Entra en [stripe.com](https://stripe.com) y regístrate gratis.
2.  **Activa tu cuenta de pagos**: Rellena los datos de tu cuenta bancaria donde quieres recibir las transferencias de las ventas.
3.  **Obtén tus claves API**:
    *   Ve al apartado **Desarrolladores > Claves API** (Developers > API Keys) en el menú de Stripe.
    *   Copia la **Clave pública** (`pk_live_...`) y la **Clave secreta** (`sk_live_...`).
4.  **Configúralo en tu panel**:
    *   Entra en el **Panel de Control** de NexusStore (usa la contraseña por defecto `admin`).
    *   En la sección de la derecha (Conexión con Stripe), desmarca la casilla "Modo de Pruebas".
    *   Introduce tus claves correspondientes (`pk_live` y `sk_live`).
    *   Haz clic en **Guardar Configuración de Stripe**.
    
*Nota: Si prefieres automatizar un flujo de Checkout gestionado 100% por los servidores de Stripe en lugar de usar el formulario interno, puedes crear un "Stripe Payment Link" en el panel de Stripe para cada producto y pegar ese enlace en el campo "Archivo de Descarga (URL)" de tu gestor de productos.*

---

## 3. Guía de Seguridad Legal (Evita problemas en España)

Para ganar dinero en internet de forma legal y segura en España, debes tener en cuenta tres pilares:

### A. Derechos de Autor (Copyright)
*   **REGLA DE ORO**: Solo vende contenido del cual seas el autor original o tengas una licencia comercial de reventa explícita.
*   **Prohibido**: Revender libros, cursos, música o códigos creados por otras personas sin su consentimiento. Hacer esto infringe la Ley de Propiedad Intelectual en España y puede conllevar multas graves o el cierre de tu cuenta de cobros.
*   **IA y Generación**: Si utilizas herramientas de Inteligencia Artificial (ChatGPT, Midjourney) para crear contenido o arte, asegúrate de utilizar planes de pago que te concedan explícitamente los derechos comerciales de las obras generadas.

### B. Declaración de Impuestos (Hacienda y Seguridad Social)
En España, toda actividad económica habitual orientada a lucrarse requiere tributar:
*   **El IVA en Productos Digitales (IVA MOSS / Ventanilla Única)**: Al vender descargas digitales automáticas (servicios electrónicos B2C), el IVA se aplica según el país donde vive tu cliente. Si vendes a alguien en España, es el 21%. Si vendes a alguien en Alemania, es el 19%. Stripe calcula esto automáticamente si activas "Stripe Tax". Debes declarar este IVA trimestralmente (Modelo 369).
*   **Darse de alta en Autónomos (RETA)**: Legalmente, si realizas ventas de forma "habitual" (es decir, tienes una web abierta al público de forma permanente vendiendo cosas), debes estar dado de alta como autónomo y en el IAE (Impuesto de Actividades Económicas).
    *   *Consejo práctico para empezar*: Si tus ingresos mensuales iniciales son muy bajos (por debajo del Salario Mínimo Interprofesional), muchos emprendedores retrasan el alta de autónomo hasta validar que la tienda realmente genera ventas regulares, declarando los primeros ingresos como "rendimientos del trabajo" u "otras actividades" en la declaración de la Renta (IRPF). Sin embargo, la ley estricta exige el alta en autónomos desde el momento en que hay habitualidad.
    *   *Tarifa Plana*: Los nuevos autónomos en España tienen derecho a una cuota reducida (unos 80€ al mes el primer año).

### C. Cumplimiento de la Web (LSSI-CE y RGPD)
Nuestra web ya incluye los enlaces de pie de página para los textos legales obligatorios en España. Asegúrate de editarlos en el código (`app.js` en la sección `LegalTexts`) con tus datos reales:
1.  **Aviso Legal**: Identifica quién está detrás de la web (Nombre, DNI o NIF, Dirección, Email de contacto). Es obligatorio por la LSSI para evitar multas por anonimato.
2.  **Términos de Servicio**: Especifica las condiciones de uso y que, por ley, las descargas digitales no tienen derecho a devolución tras la entrega inmediata.
3.  **Política de Privacidad**: Explica qué haces con el email del comprador (RGPD). Solo lo usas para enviar la descarga.

---

## 4. Cómo publicar tu tienda gratis en 5 minutos

Para que cualquier persona en el mundo pueda acceder a tu tienda, debes subir los archivos a un servidor web de confianza. Hay opciones 100% gratuitas ideales para HTML, CSS y JS:

### Opción A: Netlify (La más fácil y recomendada)
1. Entra en [netlify.com](https://www.netlify.com) y regístrate gratis.
2. Ve a la sección **Sites** en tu panel de control.
3. Arrastra y suelta la carpeta entera `nexusstore` en el recuadro que dice **"Want to deploy a new site without connecting to Git? Drag and drop your site folder here"**.
4. ¡Listo! Netlify te dará una dirección web pública tipo `https://tu-tienda.netlify.app` en segundos. Puedes asociarle un dominio personalizado (ej. `mi-tienda.com`) más adelante si lo deseas.

### Opción B: Vercel
1. Regístrate gratis en [vercel.com](https://vercel.com).
2. Descarga la aplicación de escritorio de Vercel o utiliza su herramienta CLI ejecutando `npm install -g vercel` y escribiendo `vercel` en tu terminal dentro de la carpeta del proyecto.
3. Sigue las breves instrucciones interactivas y tu web estará en producción al instante.

### Opción C: GitHub Pages
1. Sube tu carpeta a un repositorio público o privado en GitHub.
2. Ve a los **Settings** del repositorio, entra en el menú **Pages**.
3. Selecciona la rama `main` y la carpeta root `/` como origen, pulsa guardar. Tu tienda se publicará en `https://nombreusuario.github.io/nexusstore`.
