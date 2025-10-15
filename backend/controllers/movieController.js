const Movie = require("../models/movieModel");

const createMovie = async (req, res) => {
  try {
    const {
      name,
      description,
      casts,
      trailerUrl,
      language,
      releaseDate,
      director,
      releasedStatus,
    } = req.body;
    if (
      !name ||
      !description ||
      !casts ||
      !trailerUrl ||
      !language ||
      !releaseDate ||
      !director ||
      !releasedStatus
    )
      return res.status(401).send("No enough information provied");
    const find_movie = await Movie.find({ name });
    if (find_movie.length > 0)
      return res.status(409).send("Movie already exist");
    const newMovie = await Movie.create({
      name,
      description,
      casts,
      trailerUrl,
      language,
      releaseDate,
      director,
      releasedStatus,
    });
    return res.status(201).json({
      message: "Movie created successfully",
      movie: newMovie,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ Error: "Error while creating movie" + err.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(402).send("Provide the movie name");
    const find_movie = await Movie.findOneAndDelete({ name });
    if (!find_movie) return res.send("Movie doesn't exist in database");
    else return res.send("Movie deleted Succesfully");
  } catch (err) {
    res.send("Error in the deleteMovie API ", err);
  }
};

const findandReturn = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(401).send("Enter Valid name");
    const find_movie = await Movie.findOne({ name });
    if (!find_movie)
      return res.status(402).send("No movie found in the database");
    return res.json({
      name: find_movie.name,
      releaseDate: find_movie.releaseDate,
      director: find_movie.director,
      casts: find_movie.casts,
      description: find_movie.description,
    });
  } catch (err) {
    res.status(402).send("Error :" + err);
  }
};

const getAllMovies = async (req, res) => {
  try {
    const { status, language, search, page = 1, limit = 10 } = req.query;

    let query = {};

    if (status) {
      query.releasedStatus = status;
    }

    if (language) {
      query.language = { $in: [language] };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { director: { $regex: search, $options: "i" } },
        { casts: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const movies = await Movie.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Movie.countDocuments(query);

    return res.status(200).json({
      movies,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalMovies: count,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getUpcomingMovies = async (req, res) => {
  try {
    const movies = await Movie.find({
      releasedStatus: "UPCOMING",
      releaseDate: { $gte: new Date().toISOString().split("T")[0] },
    }).sort({ releaseDate: 1 });

    return res.status(200).json({ movies });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createMovie,
  deleteMovie,
  findandReturn,
  getAllMovies,
  getUpcomingMovies,
};
