create table foods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  serving_size TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  FOREIGN KEY (category_id) REFERENCES food_categories(id) ON DELETE CASCADE
);

create table nutrition_facts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  food_id INTEGER NOT NULL,
  calories REAL NOT NULL,
  protein REAL NOT NULL,
  fat REAL NOT NULL,
  carbohydrates REAL NOT NULL,
  fiber REAL NOT NULL,
  sugar REAL NOT NULL,
  sodium REAL NOT NULL,
  vitamin_a REAL,
  vitamin_c REAL,
  calcium REAL,
  iron REAL,
  FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE
);

create table food_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

insert into
  food_categories (name)
values
  ('Fruits'),
  ('Vegetables'),
  ('Grains'),
  ('Dairy'),
  ('Meat'),
  ('Fish'),
  ('Poultry'),
  ('Nuts'),
  ('Seeds'),
  ('Legumes'),
  ('Oils'),
  ('Sweets'),
  ('Beverages'),
  ('Spices'),
  ('Herbs'),
  ('Condiments'),
  ('Dressings'),
  ('Sauces'),
  ('Soups'),
  ('Breads'),
  ('Pastas'),
  ('Cereals'),
  ('Snacks'),
  ('Desserts'),
  ('Fast Food'),
  ('Restaurant'),
  ('Miscellaneous');

insert into
  foods (name, serving_size, category_id)
values
  ('Apple', '1 medium', 1),
  ('Banana', '1 medium', 1),
  ('Orange', '1 medium', 1),
  ('Strawberries', '1 cup', 1),
  ('Blueberries', '1 cup', 1),
  ('Raspberries', '1 cup', 1),
  ('Pineapple', '1 cup', 1),
  ('Mango', '1 cup', 1),
  ('Peach', '1 medium', 1),
  ('Pear', '1 medium', 1),
  ('Grapes', '1 cup', 1),
  ('Watermelon', '1 cup', 1),
  ('Cantaloupe', '1 cup', 1),
  ('Honeydew', '1 cup', 1),
  ('Cherries', '1 cup', 1),
  ('Plum', '1 medium', 1),
  ('Kiwi', '1 medium', 1),
  ('Lemon', '1 medium', 1),
  ('Lime', '1 medium', 1),
  ('Pomegranate', '1 medium', 1),
  ('Avocado', '1 medium', 1);

insert into
  nutrition_facts (
    food_id,
    calories,
    protein,
    fat,
    carbohydrates,
    fiber,
    sugar,
    sodium,
    vitamin_a,
    vitamin_c,
    calcium,
    iron
  )
values
  (1, 52, 1.1, 0.2, 12.2, 2.4, 8.9, 1, 0, 0, 0, 0),
  (2, 41, 1.4, 0.2, 9.6, 2.6, 6.2, 2, 0, 0, 0, 0),
  (3, 52, 1.1, 0.2, 12.2, 2.4, 8.9, 1, 0, 0, 0, 0),
  (4, 41, 1.4, 0.2, 9.6, 2.6, 6.2, 2, 0, 0, 0, 0),
  (5, 52, 1.1, 0.2, 12.2, 2.4, 8.9, 1, 0, 0, 0, 0),
  (6, 41, 1.4, 0.2, 9.6, 2.6, 6.2, 2, 0, 0, 0, 0),
  (7, 52, 1.1, 0.2, 12.2, 2.4, 8.9, 1, 0, 0, 0, 0),
  (8, 41, 1.4, 0.2, 9.6, 2.6, 6.2, 2, 0, 0, 0, 0),
  (9, 52, 1.1, 0.2, 12.2, 2.4, 8.9, 1, 0, 0, 0, 0),
  (10, 41, 1.4, 0.2, 9.6, 2.6, 6.2, 2, 0, 0, 0, 0),
  (
    11,
    52,
    1.1,
    0.2,
    12.2,
    2.4,
    8.9,
    1,
    0,
    0,
    0,
    0
  ),
  (12, 41, 1.4, 0.2, 9.6, 2.6, 6.2, 2, 0, 0, 0, 0),
  (13, 52, 1.1, 0.2, 12.2, 2.4, 8.9, 1, 0, 0, 0, 0),
  (14, 41, 1.4, 0.2, 9.6, 2.6, 6.2, 2, 0, 0, 0, 0),
  (15, 52, 1.1, 0.2, 12.2, 2.4, 8.9, 1, 0, 0, 0, 0),
  (16, 41, 1.4, 0.2, 9.6, 2.6, 6.2, 2, 0, 0, 0, 0),
  (17, 52, 1.1, 0.2, 12.2, 2.4, 8.9, 1, 0, 0, 0, 0),
  (18, 41, 1.4, 0.2, 9.6, 2.6, 6.2, 2, 0, 0, 0, 0),
  (19, 52, 1.1, 0.2, 12.2, 2.4, 8.9, 1, 0, 0, 0, 0),
  (20, 41, 1.4, 0.2, 9.6, 2.6, 6.2, 2, 0, 0, 0, 0),
  (21, 52, 1.1, 0.2, 12.2, 2.4, 8.9, 1, 0, 0, 0, 0);