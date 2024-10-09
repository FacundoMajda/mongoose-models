// esquema de producto (menu)
// define la estructura de un producto en el menu, incluyendo nombre, descripcion, precio, categoria e ingredientes.
const ProductSchema = new Schema({
  name: { type: String, required: true }, // el nombre del producto es obligatorio.
  description: String, // la descripcion del producto es opcional.
  price: { type: Number, required: true }, // el precio del producto es obligatorio.
  category: { type: String, enum: ["bebida", "comida", "postre"] }, // la categoria debe ser una de las opciones especificadas.
  ingredients: [String], // lista de ingredientes del producto.
});

// esquema de empleado
// define la estructura de un empleado, incluyendo nombre, posicion, fecha de contratacion y salario.
const EmployeeSchema = new Schema({
  name: { type: String, required: true }, // el nombre del empleado es obligatorio.
  position: { type: String, required: true }, // la posicion del empleado es obligatoria.
  hireDate: { type: Date, default: Date.now }, // la fecha de contratacion tiene un valor por defecto de la fecha actual.
  salary: Number, // el salario del empleado es opcional.
});

// esquema de inventario
// define la estructura de un item de inventario, incluyendo el producto, cantidad y ultima actualizacion.
const InventoryItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" }, // referencia al producto en el inventario.
  quantity: { type: Number, required: true }, // la cantidad del producto en inventario es obligatoria.
  lastUpdated: { type: Date, default: Date.now }, // la fecha de ultima actualizacion tiene un valor por defecto de la fecha actual.
});

// esquema de cafeteria (sucursal)
// define la estructura de una cafeteria, incluyendo nombre, direccion, menu, empleados e inventario.
const CafeSchema = new Schema({
  name: { type: String, required: true }, // el nombre de la cafeteria es obligatorio.
  address: {
    street: String, // la calle de la direccion es opcional.
    city: String, // la ciudad de la direccion es opcional.
    state: String, // el estado de la direccion es opcional.
    zipCode: String, // el codigo postal de la direccion es opcional.
  },
  menu: [{ type: Schema.Types.ObjectId, ref: "Product" }], // lista de productos en el menu de la cafeteria.
  employees: [EmployeeSchema], // lista de empleados en la cafeteria.
  inventory: [InventoryItemSchema], // lista de items de inventario en la cafeteria.
});

// esquema de cliente
// define la estructura de un cliente, incluyendo nombre y correo electronico.
const CustomerSchema = new Schema({
  name: { type: String, required: true }, // el nombre del cliente es obligatorio.
  email: { type: String, required: true, unique: true }, // el correo electronico del cliente es obligatorio y debe ser unico.
});

// esquema de pedido
// define la estructura de un pedido, incluyendo cliente, cafeteria, items, monto total, estado y fecha de creacion.
const OrderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "Customer" }, // referencia al cliente que realizo el pedido.
  cafe: { type: Schema.Types.ObjectId, ref: "Cafe" }, // referencia a la cafeteria donde se realizo el pedido.
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" }, // referencia al producto en el pedido.
      quantity: Number, // cantidad del producto en el pedido.
    },
  ],
  totalAmount: Number, // monto total del pedido.
  status: {
    type: String,
    enum: ["pendiente", "preparando", "listo", "entregado"], // estado del pedido debe ser una de las opciones especificadas.
  },
  createdAt: { type: Date, default: Date.now }, // la fecha de creacion del pedido tiene un valor por defecto de la fecha actual.
});

// crear modelos de mongoose para cada esquema definido.
const Product = mongoose.model("Product", ProductSchema);
const Cafe = mongoose.model("Cafe", CafeSchema);
const Customer = mongoose.model("Customer", CustomerSchema);
const Order = mongoose.model("Order", OrderSchema);
