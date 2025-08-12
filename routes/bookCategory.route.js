const express = require("express");
const router = express.Router();
const bookCategoryController = require("../controller/bookCategory.controller");

router.get("/", bookCategoryController.getAllCategories);
router.get("/:id", bookCategoryController.getCategoryById);
router.post("/", bookCategoryController.createNewCategory);
router.put("/:id", bookCategoryController.updateCategory);
router.delete("/:id", bookCategoryController.deleteCategory);

module.exports = router;