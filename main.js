// esquema de empleado
// define la estructura de un empleado, incluyendo nombre, email, contrasena y rol
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // el nombre del empleado es obligatorio
  email: { type: String, required: true, unique: true }, // el email del empleado es obligatorio y debe ser unico
  password: { type: String, required: true }, // la contrasena del empleado es obligatoria
  role: { type: String, enum: ["vendedor", "admin"], default: "vendedor" }, // el rol del empleado debe ser una de las opciones especificadas
});

// esquema de producto
// define la estructura de un producto, incluyendo nombre, descripcion, precio y stock
const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // el nombre del producto es obligatorio
  description: String, // la descripcion del producto es opcional
  price: { type: Number, required: true }, // el precio del producto es obligatorio
  stock: { type: Number, default: 0 }, // el stock del producto tiene un valor por defecto de 0
});

// esquema de cliente
// define la estructura de un cliente, incluyendo nombre, email, telefono y direccion
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true }, // el nombre del cliente es obligatorio
  email: { type: String, unique: true }, // el email del cliente debe ser unico si se proporciona
  phone: String, // el telefono del cliente es opcional
  address: String, // la direccion del cliente es opcional
});

// esquema de venta
// define la estructura de una venta, incluyendo empleado, cliente, fecha, items y total
const saleSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  }, // referencia al empleado que realizo la venta
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" }, // referencia al cliente que realizo la compra
  date: { type: Date, default: Date.now }, // la fecha de la venta tiene un valor por defecto de la fecha actual
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      }, // referencia al producto vendido
      quantity: { type: Number, required: true }, // cantidad del producto vendido
      price: { type: Number, required: true }, // precio del producto al momento de la venta
    },
  ],
  total: { type: Number, required: true }, // monto total de la venta
});

// crear modelos de mongoose para cada esquema definido
const Employee = mongoose.model("Employee", employeeSchema);
const Product = mongoose.model("Product", productSchema);
const Customer = mongoose.model("Customer", customerSchema);
const Sale = mongoose.model("Sale", saleSchema);
