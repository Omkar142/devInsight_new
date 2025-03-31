const getAllCategories = async (req, res, next) => {
  try {
    // TODO: Implement get all categories
    res.json({ message: 'Get all categories' });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    // TODO: Implement create category
    res.json({ message: 'Create category' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  createCategory
};
