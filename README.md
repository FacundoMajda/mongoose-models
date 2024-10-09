# Modelado de Datos Mongoose

## Descripción

Este TP implementa un modelo de datos NoSQL utilizando MongoDB y Mongoose para una franquicia de cafeterías.

## Estructura del Modelo de Datos

El modelo de datos consta de las siguientes entidades principales:

1. **Cafetería (Cafe)**
2. **Producto (Product)**
3. **Empleado (Employee)**
4. **Inventario (InventoryItem)**
5. **Cliente (Customer)**
6. **Pedido (Order)**

### Diagrama UML

![Diagrama UML del Modelo de Datos](./image.png)

## Decisiones de Diseño

### 1. Incrustación vs. Vinculación

- **Incrustación**:

  - Los empleados y el inventario están incrustados en el documento de Cafetería.
  - Razón: Esta información es específica de cada sucursal y no necesita ser accedida independientemente con frecuencia.

- **Vinculación**:

  - Los productos (menú) están vinculados a las cafeterías mediante referencias.
  - Los pedidos están vinculados a clientes y cafeterías.
  - Razón: Permite compartir el menú entre sucursales y facilita las actualizaciones. También permite un acceso eficiente a la información de pedidos por cliente o por sucursal.

### 2. Esquemas Flexibles

- Se utilizan arrays para almacenar múltiples valores (ej. ingredientes en productos, ítems en pedidos).
- Razón: Aprovecha la flexibilidad de MongoDB para manejar datos de longitud variable.

### 3. Índices Implícitos

- MongoDB crea automáticamente un índice en el campo `_id`.
- Razón: Facilita búsquedas rápidas por ID sin configuración adicional.

### 4. Validación de Datos

- Se implementa validación básica usando `required: true` para campos obligatorios.
- Se utiliza `enum` para campos con valores predefinidos.
- Razón: Asegura la integridad de los datos a nivel de esquema.

### 5. Relaciones

- Se utiliza `ref` para establecer relaciones entre documentos.
- Razón: Permite usar `populate()` para cargar datos relacionados cuando sea necesario.
