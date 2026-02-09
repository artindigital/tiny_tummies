import { Recipe, Milestone, Ingredient, DevelopmentStageInfo, IngredientGuide } from './types';

export const MILESTONES: Milestone[] = [
  { month: 4, title: "First Tastes", description: "Interest in food, holding head up high.", unlocked: true },
  { month: 6, title: "Solid Starts", description: "Sitting up, mashing food with tongue.", unlocked: true },
  { month: 8, title: "Pincer Grasp", description: "Picking up small objects with thumb and forefinger.", unlocked: false },
  { month: 10, title: "Chewing Skills", description: "Moving food from side to side.", unlocked: false },
  { month: 12, title: "Family Table", description: "Eating mostly the same food as family.", unlocked: false },
];

export const DEVELOPMENT_INFO: Record<string, DevelopmentStageInfo> = {
  '4-6 months': {
    title: 'Exploration Phase',
    foodsToTry: ['Single-ingredient purees', 'Iron-fortified cereals', 'Soft mashed sweet potato', 'Avocado mash'],
    foodsToAvoid: ['Honey (botulism risk)', 'Added salt', 'Added sugar', 'Whole nuts (choking)', 'Cow milk as drink'],
    skills: ['Holding head up steady', 'Lost tongue-thrust reflex', 'Opening mouth for spoon', 'Moving food to back of mouth'],
    tips: 'Start with just one meal a day. The goal is exploring flavors and textures, not calories. Milk is still the main source of nutrition.'
  },
  '6-8 months': {
    title: 'Textural Adventures',
    foodsToTry: ['Lumpy mashes', 'Soft finger foods (banana)', 'Ground meat', 'Well-cooked pasta', 'Yogurt'],
    foodsToAvoid: ['Honey', 'Whole grapes (choking)', 'Raw veggies', 'Large chunks of meat'],
    skills: ['Sitting up without support', 'Raking food with palm', 'Closing lips around spoon', 'Chewing motions'],
    tips: 'Offer variety! Introduce allergens one at a time. Let them get messy - it is part of the learning process.'
  },
  '8-10 months': {
    title: 'Pincer Master',
    foodsToTry: ['Blueberries (squashed)', 'Peas (flattened)', 'Small cheese cubes', 'Scrambled eggs', 'Beans'],
    foodsToAvoid: ['Honey', 'Hard candies', 'Popcorn', 'Whole nuts'],
    skills: ['Pincer grasp (thumb & forefinger)', 'Biting off pieces', 'Self-feeding with hands', 'Drinking from open cup'],
    tips: 'Encourage self-feeding. Meals are becoming more structured: Breakfast, Lunch, and Dinner.'
  },
  '10-12 months': {
    title: 'Almost a Toddler',
    foodsToTry: ['Family meals (low salt)', 'Toast strips', 'Chopped fruits', 'Soft meats', 'Rice'],
    foodsToAvoid: ['Honey', 'Choking hazards'],
    skills: ['Using a spoon (messily)', 'Improved chewing', 'Drinking from straw', 'Pointing at desired food'],
    tips: 'Three meals a day plus snacks. They might start eating less milk as food intake increases.'
  }
};

const mockIngredients: Ingredient[] = [
  { name: "Sweet Potato", amount: "1 medium", category: "Produce" },
  { name: "Olive Oil", amount: "1 tsp", category: "Pantry" },
  { name: "Cinnamon", amount: "pinch", category: "Pantry" }
];

export const INGREDIENT_GUIDES: IngredientGuide[] = [
  {
    id: 'banana',
    name: 'Banana',
    category: 'Produce',
    imageUrl: 'https://images.unsplash.com/photo-1571771896612-618da8fd8b00?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '4-6 months': 'Mash smoothly with breast milk or formula.',
      '6-8 months': 'Cut into long spears (finger length) for gripping. Or mash with lumps.',
      '8-10 months': 'Break into smaller chunks or serve spears.',
      '10-12 months': 'Slices or small chunks.',
    },
    chokingHazards: 'Generally safe, but avoid large hard chunks if underripe. Stickiness can cause gagging.',
    nutrition: 'Potassium, Vitamin B6, Vitamin C.'
  },
  {
    id: 'avocado',
    name: 'Avocado',
    category: 'Produce',
    imageUrl: 'https://images.unsplash.com/photo-1523049673856-425f31d89f53?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '4-6 months': 'Mash into a smooth guacamole texture.',
      '6-8 months': 'Large spears rolled in hemp seeds or crushed cheerios for grip.',
      '8-10 months': 'Small cubes.',
      '10-12 months': 'Cubes or slices on toast.',
    },
    chokingHazards: 'Very safe when ripe and soft.',
    nutrition: 'Healthy fats, Fiber, Folate.'
  },
  {
    id: 'egg',
    name: 'Egg',
    category: 'Protein',
    imageUrl: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '4-6 months': 'Hard boiled yolk mashed with milk.',
      '6-8 months': 'Omelette strips (two fingers wide). Scrambled well cooked.',
      '8-10 months': 'Scrambled pieces or chopped hard boiled egg.',
    },
    chokingHazards: 'No major hazard if cooked soft. Common allergen.',
    nutrition: 'Choline, Protein, Iron.'
  },
  {
    id: 'broccoli',
    name: 'Broccoli',
    category: 'Produce',
    imageUrl: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '6-8 months': 'Large florets steamed until very soft. Baby holds the stem.',
      '8-10 months': 'Chopped florets.',
      '10-12 months': 'Small pieces.',
    },
    chokingHazards: 'Raw stems are hard. Steam until you can squash it between fingers.',
    nutrition: 'Iron, Calcium, Vitamin C.'
  },
  {
    id: 'blueberries',
    name: 'Blueberries',
    category: 'Produce',
    imageUrl: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '6-8 months': 'Stewed/cooked until skins burst and mashed.',
      '8-10 months': 'Raw but FLATTENED between fingers (smush them).',
      '10-12 months': 'Flattened or halved.',
      '12-18 months': 'Whole if confident chewer, otherwise halved.',
    },
    chokingHazards: 'High risk if served whole and round. ALWAYS flatten or halve.',
    nutrition: 'Antioxidants, Fiber.'
  },
  {
    id: 'salmon',
    name: 'Salmon',
    category: 'Protein',
    imageUrl: 'https://images.unsplash.com/photo-1599084993091-1e8c0b4d5e75?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '6-8 months': 'Cooked thoroughly and flaked. Remove all bones.',
      '8-10 months': 'Flaked pieces or formed into soft patties.',
    },
    chokingHazards: 'Bones are the main hazard. Check carefully.',
    nutrition: 'Omega-3 (DHA), Protein.'
  },
  {
    id: 'yogurt',
    name: 'Yogurt',
    category: 'Dairy',
    imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '4-6 months': 'Plain whole milk yogurt on a spoon.',
      '6-8 months': 'Self-feeding with pre-loaded spoon.',
    },
    chokingHazards: 'None. Common allergen (dairy).',
    nutrition: 'Calcium, Probiotics, Fat.'
  },
  {
    id: 'oats',
    name: 'Oats',
    category: 'Grain',
    imageUrl: 'https://images.unsplash.com/photo-1613063373999-ad9d80c640d5?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '4-6 months': 'Iron-fortified oat flour porridge.',
      '6-8 months': 'Thicker porridge or oat fingers (baked).',
    },
    chokingHazards: 'None if cooked. Dry oats can cause coughing.',
    nutrition: 'Iron, Fiber, Zinc.'
  },
  {
    id: 'apple',
    name: 'Apple',
    category: 'Produce',
    imageUrl: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '4-6 months': 'Cooked, peeled, and pureed smooth.',
      '6-8 months': 'Cooked until soft wedges or grated raw.',
      '8-10 months': 'Cooked pieces or very thin raw slices.',
    },
    chokingHazards: 'Raw apple is a top choking hazard. Cook until soft or grate.',
    nutrition: 'Fiber, Vitamin C.'
  },
  {
    id: 'carrot',
    name: 'Carrot',
    category: 'Produce',
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '4-6 months': 'Steamed until very soft and pureed.',
      '6-8 months': 'Whole peeled carrot steamed soft (baby holds like handle).',
      '8-10 months': 'Cooked and diced into small cubes.',
    },
    chokingHazards: 'Raw carrots are very hard. Always cook until soft or grate finely.',
    nutrition: 'Vitamin A (Beta-carotene), Fiber.'
  },
  {
    id: 'chicken',
    name: 'Chicken',
    category: 'Protein',
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '6-8 months': 'Drumstick (bone-in, skin removed) for gnawing or ground chicken.',
      '8-10 months': 'Shredded chicken or small soft pieces.',
      '10-12 months': 'Diced pieces.',
    },
    chokingHazards: 'Large chunks of dry meat. Serve with sauce or broth.',
    nutrition: 'Protein, Iron, Zinc.'
  },
  {
    id: 'beef',
    name: 'Beef',
    category: 'Protein',
    imageUrl: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '6-8 months': 'Large strip of steak for sucking juices (remove before bite). Ground beef.',
      '8-10 months': 'Meatballs or soft shredded beef.',
    },
    chokingHazards: 'Tough, chewy pieces. Cook slow and low for tenderness.',
    nutrition: 'Iron (Heme), Protein, Zinc.'
  },
  {
    id: 'lentils',
    name: 'Lentils',
    category: 'Protein',
    imageUrl: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '6-8 months': 'Mashed lentils or lentil cakes.',
      '8-10 months': 'Whole cooked lentils (flattened if large).',
    },
    chokingHazards: 'Low risk if cooked soft.',
    nutrition: 'Iron, Fiber, Plant Protein.'
  },
  {
    id: 'pasta',
    name: 'Pasta',
    category: 'Grain',
    imageUrl: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '6-8 months': 'Large pasta shapes (penne, fusilli) cooked very soft.',
      '8-10 months': 'Smaller pasta shapes or cut pieces.',
    },
    chokingHazards: 'Low risk. Overcook slightly for safety.',
    nutrition: 'Carbohydrates, Energy.'
  },
  {
    id: 'cheese',
    name: 'Cheese',
    category: 'Dairy',
    imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '6-8 months': 'Grated cheese or melted onto toast.',
      '8-10 months': 'Thin slices or small cubes.',
    },
    chokingHazards: 'Cubes can be risky if too large or hard. Avoid string cheese in round shape.',
    nutrition: 'Calcium, Fat, Protein.'
  },
  {
    id: 'peanutbutter',
    name: 'Peanut Butter',
    category: 'Pantry',
    imageUrl: 'https://images.unsplash.com/photo-1514944407886-f641c2c3666b?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '4-6 months': 'Thinned with water/milk and mixed into oatmeal.',
      '6-8 months': 'Spread VERY thinly on toast strips.',
    },
    chokingHazards: 'Globs of nut butter are a high choking risk. Thin it out.',
    nutrition: 'Healthy Fats, Protein, Allergen exposure.'
  },
  {
    id: 'strawberry',
    name: 'Strawberry',
    category: 'Produce',
    imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '6-8 months': 'Large whole berry (very ripe/soft).',
      '8-10 months': 'Chopped into small pieces.',
    },
    chokingHazards: 'Small, firm berries. Ensure they are soft.',
    nutrition: 'Vitamin C, Antioxidants.'
  },
  {
    id: 'mango',
    name: 'Mango',
    category: 'Produce',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '6-8 months': 'Mango pit with most flesh removed (for gnawing/grip).',
      '8-10 months': 'Small slippery pieces (roll in coconut/hemp seeds for grip).',
    },
    chokingHazards: 'Very slippery. Rolling in crumbs helps grip.',
    nutrition: 'Vitamin A, Vitamin C.'
  },
  {
    id: 'watermelon',
    name: 'Watermelon',
    category: 'Produce',
    imageUrl: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '6-8 months': 'Large rectangular slice with rind removed.',
      '8-10 months': 'Small dices.',
    },
    chokingHazards: 'Seeds. Remove all seeds.',
    nutrition: 'Hydration, Lycopene.'
  },
  {
    id: 'tomato',
    name: 'Tomato',
    category: 'Produce',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '6-8 months': 'Large wedge of beefsteak tomato (skin removed).',
      '8-10 months': 'Quartered cherry tomatoes (NEVER WHOLE).',
    },
    chokingHazards: 'Cherry tomatoes are a major hazard. Always quarter lengthwise.',
    nutrition: 'Vitamin C, Lycopene.'
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    category: 'Produce',
    imageUrl: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '6-8 months': 'Long thick spear, skin removed. Cool for teething.',
      '8-10 months': 'Thin half-moons or diced.',
    },
    chokingHazards: 'Raw rounds are hard and dangerous. Cut lengthwise.',
    nutrition: 'Hydration, Vitamin K.'
  },
  {
    id: 'spinach',
    name: 'Spinach',
    category: 'Produce',
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '6-8 months': 'Finely chopped and cooked into omelets or mashes.',
      '8-10 months': 'Cooked whole leaves mixed in sauce.',
    },
    chokingHazards: 'Raw leaves can stick to palate. Cook down.',
    nutrition: 'Iron, Calcium, Folate.'
  },
  {
    id: 'bread',
    name: 'Bread/Toast',
    category: 'Grain',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '6-8 months': 'Toast strips (2 fingers wide). Avoid soft gummy bread.',
      '8-10 months': 'Small squares of toast with topping.',
    },
    chokingHazards: 'Untoasted soft bread can ball up in mouth. Lightly toast.',
    nutrition: 'Carbohydrates, B Vitamins.'
  },
  {
    id: 'rice',
    name: 'Rice',
    category: 'Grain',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '6-8 months': 'Mashed with sauce into balls.',
      '8-10 months': 'Loose rice (good pincer practice).',
    },
    chokingHazards: 'Low risk. Serve moist.',
    nutrition: 'Energy, Carbohydrates.'
  },
  {
    id: 'beans',
    name: 'Black Beans',
    category: 'Protein',
    imageUrl: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '6-8 months': 'Mashed into a paste.',
      '8-10 months': 'Whole beans gently flattened.',
    },
    chokingHazards: 'Whole round beans. Flatten them.',
    nutrition: 'Iron, Fiber, Protein.'
  },
  {
    id: 'tofu',
    name: 'Tofu',
    category: 'Protein',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '6-8 months': 'Large strips of firm tofu.',
      '8-10 months': 'Small cubes.',
    },
    chokingHazards: 'Low risk. Soft texture.',
    nutrition: 'Calcium, Protein, Iron.'
  },
  {
    id: 'peach',
    name: 'Peach',
    category: 'Produce',
    imageUrl: 'https://images.unsplash.com/photo-1522766189194-978308a4928d?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '6-8 months': 'Very ripe half (skin off) or stewed slices.',
      '8-10 months': 'Small ripe pieces.',
    },
    chokingHazards: 'Hard underripe fruit. Ensure softness.',
    nutrition: 'Vitamin C, Vitamin A.'
  },
  {
    id: 'bellpepper',
    name: 'Bell Pepper',
    category: 'Produce',
    imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdf5efa269?auto=format&fit=crop&q=80&w=400',
    preparation: {
      '6-8 months': 'Roasted/steamed strips (skin removed).',
      '8-10 months': 'Small cooked pieces.',
    },
    chokingHazards: 'Raw pieces. Cook until soft.',
    nutrition: 'Vitamin C (very high).'
  }
];

export const RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Velvety Sweet Potato Mash',
    description: 'A gentle introduction to solids with natural sweetness.',
    fullDescription: 'This smooth puree is perfect for first tastes. Sweet potatoes are packed with Vitamin A and fiber. We roast them to bring out the natural caramel flavors before mashing with a touch of breast milk or formula for familiarity.',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    ageGroups: ['4-6 months', '6-8 months'],
    mealType: 'Lunch',
    prepTime: '25 mins',
    nutritionHighlight: 'Rich in Beta-Carotene',
    ingredients: mockIngredients
  },
  {
    id: '2',
    title: 'Avocado & Banana Smash',
    description: 'Creamy healthy fats perfect for brain development.',
    fullDescription: 'No cooking required! This nutrient-dense combination offers healthy monounsaturated fats from avocado and potassium from bananas. It is creamy texture is widely accepted by babies just starting out.',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    ageGroups: ['4-6 months', '6-8 months', '8-10 months'],
    mealType: 'Breakfast',
    prepTime: '5 mins',
    nutritionHighlight: 'Healthy Fats for Brain',
    ingredients: [
      { name: "Avocado", amount: "1/2 ripe", category: "Produce" },
      { name: "Banana", amount: "1/2 ripe", category: "Produce" }
    ]
  },
  {
    id: '3',
    title: 'Soft Broccoli Florets',
    description: 'Great for practicing grasping and exploring textures.',
    fullDescription: 'Steamed broccoli florets are an excellent finger food for babies developing their palmar grasp. The "handle" makes it easy to hold while they gnaw on the soft florets.',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    ageGroups: ['6-8 months', '8-10 months'],
    mealType: 'Dinner',
    prepTime: '10 mins',
    nutritionHighlight: 'Iron & Vitamin C',
    ingredients: [
      { name: "Broccoli", amount: "1 head", category: "Produce" }
    ]
  },
  {
    id: '4',
    title: 'Blueberry Oat Muffins',
    description: 'Sugar-free muffins perfect for baby led weaning.',
    fullDescription: 'These soft, moist muffins are sweetened only with fruit. They are easy to hold and break apart in the mouth, making them safe for established eaters. Great for freezing in batches.',
    imageUrl: 'https://picsum.photos/400/300?random=4',
    ageGroups: ['8-10 months', '10-12 months', '12-18 months'],
    mealType: 'Snack',
    prepTime: '30 mins',
    nutritionHighlight: 'Fiber & Antioxidants',
    ingredients: [
      { name: "Oats", amount: "1 cup", category: "Pantry" },
      { name: "Blueberries", amount: "1/2 cup", category: "Produce" },
      { name: "Banana", amount: "1 mashed", category: "Produce" },
      { name: "Egg", amount: "1", category: "Protein" }
    ]
  },
  {
    id: '5',
    title: 'Salmon & Pea Fishcakes',
    description: 'Omega-3 rich soft cakes for dinner.',
    fullDescription: 'Flaky salmon mixed with mashed potato and sweet peas. These patties are pan-fried gently to create a soft interior with a slightly firm exterior that is easy for little hands to hold.',
    imageUrl: 'https://picsum.photos/400/300?random=5',
    ageGroups: ['10-12 months', '12-18 months', '18-24 months'],
    mealType: 'Dinner',
    prepTime: '40 mins',
    nutritionHighlight: 'Omega-3 Fatty Acids',
    ingredients: [
      { name: "Salmon Fillet", amount: "1", category: "Protein" },
      { name: "Potato", amount: "1 large", category: "Produce" },
      { name: "Peas", amount: "1/2 cup", category: "Produce" }
    ]
  },
  {
    id: '6',
    title: 'Yogurt & Berry Swirl',
    description: 'Probiotics and vitamins in a colorful bowl.',
    fullDescription: 'Full-fat Greek yogurt swirled with a homemade berry coulis (just stewed fruit). Excellent for practicing with a spoon.',
    imageUrl: 'https://picsum.photos/400/300?random=6',
    ageGroups: ['6-8 months', '8-10 months', '24+ months'],
    mealType: 'Breakfast',
    prepTime: '5 mins',
    nutritionHighlight: 'Calcium & Probiotics',
    ingredients: [
      { name: "Greek Yogurt", amount: "1/2 cup", category: "Dairy" },
      { name: "Strawberries", amount: "3", category: "Produce" }
    ]
  }
];