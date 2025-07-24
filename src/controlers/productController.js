import productServices from "../services/productServices.js";

export async function createProduct(req, res) {
  try {
    const { name, description, price, stock, category, images, status } = req.body;

    const existingProduct = await productServices.getByDescription(description);
    if (existingProduct) {
      return res.status(400).render("auth/failed", { error: "El producto ya existe" });
    }

    const newProduct = await productServices.createProduct({
        name,
        description,
        price,
        stock,
        category,
        images,
        status,
    });
    console.log(newProduct);
    const allProducts = await productServices.getProducts();

    res.status(201).json({
      message: "Producto creado con éxito",
      producto: newProduct,
      todos: allProducts
     });

  } catch (error) {
    res.status(500).render("auth/failed", { error: error.message });
  }
};

export async function getProducts(req, res) {
  try {
    const products = await productServices.getProducts();
    res.status(200).json({ products });
  } catch (error) {
    res.status(404).render("auth/failed", { error: error.message });
  }
};
export async function getProductsById(req, res) {
  try {
    const id = req.product._id; //revisar
    const product = await productServices.getProducts(id);
    res.status(200).json({ products });
  } catch (error) {
    res.status(404).render("auth/failed", { error: error.message });
  }
};

export async function updateProduct(req, res) {
  try {
    const productId = req.product._id;
    const updateData = req.body;
    const updatedProduct = await productServices.updateById (productId, updateData);
    res.status(200).render("user/profile", {updatedProduct});
  } catch (error) {
    res.status(400).render("auth/failed", { error: error.message });
  }
};

export async function deleteUserAccount(req, res) {
  try {
    const productId = req.user._id;
    const deletedProduct = await productServices.deleteById(productId);
    res.status(200).json({
      message: "Producto eliminado correctamente",
      deletedProduct,
    });
  } catch (error) {
    res.status(400).render("auth/failed", { error: error.message });
  }
};
