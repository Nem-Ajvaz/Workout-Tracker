const router = require("express").Router();
const db = require("../models");

router.get("/workouts", async (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/workouts/:id", async (req, res) => {
  db.Workout.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { exercises: req.body } },
    { new: true }
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/workouts", async (req, res) => {
  db.Workout.create(req.body)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/workouts/range", async (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
    { $sort: { day: -1 } },
    { $limit: 7 },
  ])
    .then((response) => res.status(200).json(response))
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
