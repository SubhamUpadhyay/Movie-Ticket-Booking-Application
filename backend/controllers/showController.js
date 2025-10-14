const Show = require("../models/showModel");

const createShow = async (req, res) => {
    try {
        const show = await Show.create(req.body);
        return res.status(201).json({
            message: "Show created successfully",
            show
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getShowsByMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const shows = await Show.find({ movie: movieId, status: 'ACTIVE' })
            .populate('movie', 'name language')
            .populate('theater', 'name location');
        
        return res.status(200).json({ shows });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getShowsByTheater = async (req, res) => {
    try {
        const { theaterId } = req.params;
        const { date } = req.query; // Optional date filter
        
        let query = { theater: theaterId, status: 'ACTIVE' };
        if (date) {
            query.showDate = new Date(date);
        }
        
        const shows = await Show.find(query)
            .populate('movie', 'name language duration')
            .sort({ showDate: 1, showTime: 1 });
        
        return res.status(200).json({ shows });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { createShow, getShowsByMovie, getShowsByTheater };