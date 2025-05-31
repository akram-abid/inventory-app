const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("select * from categories");
  return rows;
}

async function getAllMovies() {
  const { rows } = await pool.query("select * from movies");
  return rows;
}

async function storeNewCategorie(name) {
  await pool.query("insert into categories (name) values($1)", [name]);
}

async function storeNewMovie(name, date, desc, categ, imageurl) {
  await pool.query(
    "INSERT INTO movies (name, release_date, description, category_id, imageurl) VALUES ($1, $2, $3, $4, $5)",
    [name, date, desc, categ, imageurl]
  );
}

async function getMovieById(id) {
    const result = await pool.query("SELECT * FROM movies WHERE id = $1", [id]);
    if (result.rows.length > 0) {
        return result.rows[0];
    } else {
        return null;
    }
}

async function getCategoryById(id) {
    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
    if (result.rows.length > 0) {
        return result.rows[0];
    } else {
        return null;
    }
}


module.exports = {
  getAllMovies,
  getAllCategories,
  storeNewCategorie,
  storeNewMovie,
  getCategoryById,
  getMovieById
};
