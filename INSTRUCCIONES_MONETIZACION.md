# Guía de Monetización y Seguridad Legal: NexusStore + Lemon Squeezy

¡Felicidades! Tienes una plataforma digital premium completamente funcional y lista para operar. Esta guía te explica detalladamente cómo utilizar **NexusStore** integrado con **Lemon Squeezy** para generar ingresos de forma 100% legal, segura y sin los dolores de cabeza fiscales habituales de vender en España.

---

## 1. ¿Cómo te da dinero esta tienda?

Una plataforma de software por sí misma es un escaparate digital. Para monetizarla con éxito, debes ofrecer **productos digitales de valor real** que tus clientes quieran adquirir.

### Ideas de productos digitales rentables:
*   **Plantillas de Notion/Excel**: Para organizar la productividad, finanzas, nutrición o gestión empresarial.
*   **Ebooks y Guías prácticas**: Escribe sobre temas que domines o utiliza herramientas de Inteligencia Artificial para redactar guías especializadas (ej. *Guía de Automatización con ChatGPT para PyMEs*).
*   **Recursos de interfaz y diseño (Assets)**: Iconos 3D, plantillas para Canva, tipografías o presets de Lightroom para fotógrafos.
*   **Código o Plantillas Web**: Scripts útiles, plugins o temas web listos para usar.

---

## 2. Lemon Squeezy: Tu Socio Legal (Merchant of Record)

Para vender productos digitales en España de forma legal, el mayor obstáculo es la burocracia de los impuestos y el alta de autónomos. Al integrar **Lemon Squeezy**, resuelves estos problemas de raíz.

### ¿Qué es un Merchant of Record (MoR)?
Lemon Squeezy no es solo una pasarela de pago como Stripe; es un **Merchant of Record (Vendedor Autorizado)**. Esto significa que a nivel legal:
1.  **Lemon Squeezy compra tu producto** de forma instantánea en el momento de la venta y se lo revende al cliente final.
2.  **Ellos emiten la factura legal** al cliente final y retienen/liquidan el IVA correspondiente en cualquier país de la Unión Europea (y del mundo) bajo el régimen MOSS.
3.  **Tú recibes pagos acumulados** en concepto de **Regalías por Propiedad Intelectual / Licencia de Software** (Payouts).

### ¿Cuánto cuesta usar Lemon Squeezy?
No hay cuota mensual ni coste de configuración. Solo pagas una pequeña comisión por cada transacción exitosa:
*   **Comisión estándar:** 5% + $0.50 por venta.
*   Si no vendes nada, **el coste es 0**.

---

## 3. Cómo conectar cobros reales en 5 minutos

Actualmente la tienda funciona en **modo simulado** (si el producto no tiene enlace, abrirá la pasarela con tarjeta de crédito 3D animada para demostraciones). Para aceptar cobros de verdad:

1.  **Crea una cuenta en Lemon Squeezy**: Regístrate gratis en [lemonsqueezy.com](https://www.lemonsqueezy.com).
2.  **Configura tu método de cobro**: Introduce tu cuenta bancaria (IBAN) en la sección de facturación para recibir tus pagos.
3.  **Crea un producto en su panel**:
    *   Ve a **Store > Products** y haz clic en *New Product*.
    *   Sube el archivo digital (PDF, ZIP, etc.) para que Lemon Squeezy lo entregue automáticamente.
    *   Establece el precio y guarda.
4.  **Copia el enlace de pago**:
    *   En tu lista de productos de Lemon Squeezy, pulsa en el botón **Share** de tu producto.
    *   Copia el *Checkout Link* (enlace para compartir, ej. `https://tu-tienda.lemonsqueezy.com/checkout/buy/...`).
5.  **Pégalo en NexusStore**:
    *   Entra en el **Panel de Control** de NexusStore (contraseña por defecto: `admin`).
    *   En la tabla de inventario, haz clic en **Editar** (icono de lápiz) en el producto correspondiente.
    *   Pega tu enlace en el campo **Enlace de Pago Lemon Squeezy / Gumroad**.
    *   ¡Haz clic en **Guardar Producto** y listo!

Ahora, cuando un cliente pulse "Adquirir Ahora", se abrirá el **Overlay Flotante** de Lemon Squeezy (o una pestaña nueva según configures el interruptor del panel) de forma fluida y premium, permitiendo pagos reales por tarjeta, Apple Pay, Google Pay o PayPal.

---

## 4. Guía Legal para España: Vender sin ser Autónomo

Una de las preguntas más recurrentes en España es si es obligatorio darse de alta como autónomo en la Seguridad Social y Hacienda para vender online.

### El truco legal de Lemon Squeezy (Regalías por Derechos de Autor)
En la legislación española, el alta en el RETA (Régimen Especial de Trabajadores Autónomos) es obligatorio para realizar una actividad económica de forma "habitual, personal y directa". Sin embargo, al vender a través de un MoR como Lemon Squeezy, el flujo cambia:

1.  **No ejerces comercio minorista directo:** Tú no le vendes al cliente. Le otorgas una licencia de distribución a Lemon Squeezy, y ellos facturan.
2.  **Calificación fiscal:** Tus ingresos se clasifican como **Rendimientos del Trabajo derivados de la cesión de Derechos de Autor o Propiedad Intelectual** (según el Artículo 17.2.d de la Ley del IRPF de España).
3.  **Bajo esta modalidad:** La ley de Propiedad Intelectual española te permite ceder tus derechos de explotación de obras científicas, literarias, artísticas o de software sin la obligación de estar dado de alta como autónomo en la Seguridad Social, siempre y cuando no dispongas de una estructura empresarial física u oficina abierta al público para ello.

### ¿Cómo declarar este dinero en la Renta (IRPF)?
*   Cuando Lemon Squeezy te transfiera el dinero acumulado de tus ventas, debes incluirlo en tu declaración anual de la Renta (Modelo 100) en el apartado de **Rendimientos del Trabajo**.
*   **Ventaja fiscal:** Este tipo de rendimientos goza de reducciones fiscales y no están sujetos a retenciones ni declaraciones de IVA trimestrales (ya que Lemon Squeezy ya liquidó el IVA correspondiente).

> [!IMPORTANT]
> **Límite aconsejado:** Si tus ingresos mediante regalías empiezan a ser estables y superan el Salario Mínimo Interprofesional (SMI) en cómputo anual, o si contratas personal o alquilas un local, la Seguridad Social considerará que hay una estructura económica habitual y deberás darte de alta como autónomo. Úsalo para validar tu negocio al principio sin riesgos legales ni costes fijos.

---

## 5. Hosting y Despliegue en Producción

Tu tienda digital ya se encuentra desplegada y funcionando en producción.

### URL Actual de tu Tienda:
[https://oriolramosnavarro.github.io/nexusstore/](https://oriolramosnavarro.github.io/nexusstore/)

### Cómo actualizar los archivos en la web:
Como los cambios están en tu repositorio local sincronizado con GitHub, solo debes empujar los cambios desde tu terminal para que se actualicen en vivo:

```powershell
# Añade todos los cambios que hemos realizado
git add .

# Guarda el estado
git commit -m "Migración completa de checkout a Lemon Squeezy"

# Sube los cambios para reconstruir la web en GitHub Pages
git push origin main
```

En aproximadamente 1-2 minutos, los servidores de GitHub terminarán de reconstruir la página y podrás probar los checkouts de Lemon Squeezy en vivo.
