const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");
const mongoose = require("mongoose");

const generateBookingId = () => {
    return 'BKG' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
};

const createBooking = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const { showId, seats } = req.body;
        const userId = req.user.userId;

        // Validate show
        const show = await Show.findById(showId).session(session);
        if (!show || show.status !== 'ACTIVE') {
            await session.abortTransaction();
            return res.status(404).json({ error: "Show not available" });
        }

        // Calculate total and check availability
        let totalAmount = 0;
        for (let seat of seats) {
            if (show.availableSeats[seat.seatType] < 1) {
                await session.abortTransaction();
                return res.status(400).json({ error: `${seat.seatType} seats not available` });
            }
            seat.price = show.pricing[seat.seatType];
            totalAmount += seat.price;
            show.availableSeats[seat.seatType] -= 1;
        }

        // Create booking
        const booking = await Booking.create([{
            user: userId,
            show: showId,
            seats,
            totalAmount,
            bookingId: generateBookingId()
        }], { session });

        // Update show
        await show.save({ session });

        await session.commitTransaction();

        return res.status(201).json({
            message: "Booking created successfully",
            booking: booking[0]
        });

    } catch (err) {
        await session.abortTransaction();
        return res.status(500).json({ error: err.message });
    } finally {
        session.endSession();
    }
};

const getUserBookings = async (req, res) => {
    try {
        const userId = req.user.userId;
        const bookings = await Booking.find({ user: userId })
            .populate({
                path: 'show',
                populate: [
                    { path: 'movie', select: 'name language' },
                    { path: 'theater', select: 'name location' }
                ]
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({ bookings });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const cancelBooking = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { bookingId } = req.params;
        const userId = req.user.userId;

        const booking = await Booking.findOne({ 
            bookingId, 
            user: userId 
        }).session(session);

        if (!booking) {
            await session.abortTransaction();
            return res.status(404).json({ error: "Booking not found" });
        }

        if (booking.bookingStatus === 'CANCELLED') {
            await session.abortTransaction();
            return res.status(400).json({ error: "Booking already cancelled" });
        }

        // Restore seats
        const show = await Show.findById(booking.show).session(session);
        for (let seat of booking.seats) {
            show.availableSeats[seat.seatType] += 1;
        }
        await show.save({ session });

        // Update booking
        booking.bookingStatus = 'CANCELLED';
        booking.paymentStatus = 'REFUNDED';
        await booking.save({ session });

        await session.commitTransaction();

        return res.status(200).json({
            message: "Booking cancelled successfully",
            booking
        });

    } catch (err) {
        await session.abortTransaction();
        return res.status(500).json({ error: err.message });
    } finally {
        session.endSession();
    }
};

module.exports = { createBooking, getUserBookings, cancelBooking };