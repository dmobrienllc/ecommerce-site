const router = require('express').Router();
// const User = require('../../models/User');
// const UserController = require('../../controllers/user-controller');


const {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/user-controller');

router.route('/:id').get(getUserById);
router.route('/').post(createUser);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);

module.exports = router;

//them access to the admin page
router.get("/:id", async (req, res) => {
  console.log(req.params)
  try {
    const response = await UserController.getUserById(req.params.id);

    req.session.save(() => {
      req.session.user_id = response._id;
      req.session.user_name = response.user_name;
      req.session.is_admin = response.role === "Admin" ? true:false;
      req.session.logged_in = true;

      res.status(200).json(response);
    });
  } catch (err) {
    console.log("Error in /api/users/:id");
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  console.log("User req body", req.body)
  try {
    const response = await UserController.createUser(req.body);
    res.status(200).json(response);
  }
  catch (err) {
    console.log("Catch", err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    console.log("PUT api/users/", req.body);

    const response = await UserController.updateUser(req.params.id, req.body);

    res.status(200).json(response);

  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    console.log("PUT api/users/", req.body);

    const response = await UserController.deleteUser({ _id: req.params.id });

    res.status(200).json(response);

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;


//Called by 'Sign-up' form on login page
//Returns user if exists
//Creates user if user doesn't exist
// router.get('/', async (req, res) => {
//   try {
//     console.log(req.body)

//     let response = await User.findOne
//       ({
//         "email": req.body.email
//       }).lean();

//     if (!response) {
//       response = await User.create(req.body);
//     }

//     req.session.save(() => {
//       req.session.user_id = response._id;
//       req.session.user_name = response.username;
//       req.session.logged_in = true;

//       res.status(200).json(response);
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });
//Called by 'Login' form on login page
// router.post('/login', async (req, res) => {
//   console.log("Hitting api/users/login");
//   try {
//     const userData = await User.findOne 
//         ({ 
//             "email" : req.body.email 
//         });

//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: 'No User Found For This Email.' });
//       return;
//     }else{
//         console.log("We have user data");
//     }

//     const validPassword = await userData.comparePassword(req.body.password);
//     console.log("ValidPassword",validPassword);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Invalid password, please try again' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = userData._id;
//       req.session.user_name = userData.user_name;
//       req.session.logged_in = true;

//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });

// //get this working now, but update later to work with a model
// //separating Workout and Exercise
// //UPDATE workout
// router.put("/workouts/:id", async (req, res) => {
//   db.Workout.findOneAndUpdate({ _id: req.params.id },{ $push: { exercises: req.body } })
//   .then(updatedWorkout => res.json(updatedWorkout))
//   .catch(err =>  {
//       res.status(400).json(err);
//   });
// });

// //For loading the charts
// router.get("/workouts/range",(req,res) => {
//   console.log("Hit api/workouts/range");

//   db.Workout.aggregate([{$addFields: {'totalDuration':{$sum:`$exercises.duration`}}}])
//       .sort({_id:-1}).limit(7)
//       .then(workouts => {
//           console.log("workouts in range",workouts);
//           res.json(workouts);
//       })
//       .catch(err => {
//           console.log('/api/workout/stats',err);
//           res.status(400).json(err);
//       });
// });

// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }

//   res.render("/homepage");
// });

