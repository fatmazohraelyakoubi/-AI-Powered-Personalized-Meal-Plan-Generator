import MealPlan from "../models/MealPlan.js";

// 🔹 إنشاء خطة وجبات جديدة
export const createMealPlan = async (req, res) => {
  try {
    const { meals } = req.body;
    console.log("🔍 Authorization Header:", req.headers.authorization);

    // حساب إجمالي السعرات الحرارية لكل الوجبات
    const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

    const newMealPlan = new MealPlan({
      user: req.user.id, // يربط الخطة بالمستخدم الذي أنشأها
      meals,
      totalCalories,
    });

    await newMealPlan.save();
    res.status(201).json(newMealPlan);
  } catch (error) {
    res.status(500).json({ message: "خطأ في إنشاء خطة الوجبات", error: error.message });
  }
};

// 🔹 جلب جميع خطط الوجبات لمستخدم معين
export const getUserMealPlans = async (req, res) => {
  try {
    const mealPlans = await MealPlan.find({ user: req.user.id });
    res.json(mealPlans);
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب خطط الوجبات", error: error.message });
  }
};

// 🔹 تحديث خطة وجبات
export const updateMealPlan = async (req, res) => {
  try {
    const { meals } = req.body;
    
    // تحديث السعرات الحرارية الإجمالية
    const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

    const updatedMealPlan = await MealPlan.findByIdAndUpdate(
      req.params.id,
      { meals, totalCalories },
      { new: true }
    );

    if (!updatedMealPlan) {
      return res.status(404).json({ message: "خطة الوجبات غير موجودة" });
    }

    res.json(updatedMealPlan);
  } catch (error) {
    res.status(500).json({ message: "خطأ في تحديث خطة الوجبات", error: error.message });
  }
};

// 🔹 حذف خطة وجبات
export const deleteMealPlan = async (req, res) => {
  try {
    const deletedMealPlan = await MealPlan.findByIdAndDelete(req.params.id);
    if (!deletedMealPlan) {
      return res.status(404).json({ message: "خطة الوجبات غير موجودة" });
    }
    res.json({ message: "تم حذف خطة الوجبات بنجاح" });
  } catch (error) {
    res.status(500).json({ message: "خطأ في حذف خطة الوجبات", error: error.message });
  }
};


// 🔹 جلب جميع الوجبات من قاعدة البيانات
export const getAllMeals = async (req, res) => {
  try {
    const allMeals = await MealPlan.find().select("meals"); // جلب فقط الوجبات
    const meals = allMeals.flatMap(plan => plan.meals); // دمج جميع الوجبات من الخطط المختلفة

    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب جميع الوجبات", error: error.message });
  }
};