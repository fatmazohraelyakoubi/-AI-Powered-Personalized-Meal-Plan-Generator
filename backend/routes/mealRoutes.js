import express from "express";
import { createMealPlan, getUserMealPlans, updateMealPlan, deleteMealPlan, getAllMeals} from "../controllers/mealController.js";
import authMiddleware from "../middleware/authMiddleware.js"; 

const router = express.Router();


router.post("/", authMiddleware, createMealPlan);


router.get("/", authMiddleware, getUserMealPlans);

router.put("/:id", authMiddleware, updateMealPlan);

router.get("/all", authMiddleware, getAllMeals);

router.delete("/:id", authMiddleware, deleteMealPlan);

export default router;
