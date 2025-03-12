import mongoose from "mongoose";

const mealPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // يربط خطة الوجبة بالمستخدم
      required: true,
    },
    meals: [
      {
        name: { type: String, required: true }, // اسم الوجبة
        calories: { type: Number, required: true }, // عدد السعرات الحرارية
        protein: { type: Number, required: true }, // كمية البروتين
        carbs: { type: Number, required: true }, // كمية الكربوهيدرات
        fats: { type: Number, required: true }, // كمية الدهون
      },
    ],
    totalCalories: { type: Number, required: true }, // إجمالي السعرات الحرارية للخطة
  },
  {
    timestamps: true, // يضيف `createdAt` و `updatedAt`
  }
);

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

export default MealPlan;
