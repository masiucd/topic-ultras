CREATE TABLE foods (
  food_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE nutrients (
  nutrient_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE units (
  unit_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(50) NOT NULL,
  conversion_factor DECIMAL(10, 5) NOT NULL -- conversion factor to base unit (e.g., grams)
);

-- CREATE TABLE food_nutrients (
--   food_id INT,
--   nutrient_id INT,
--   unit_id INT,
--   amount DECIMAL(10, 2) NOT NULL,
--   PRIMARY KEY (food_id, nutrient_id, unit_id),
--   FOREIGN KEY (food_id) REFERENCES foods(food_id),
--   FOREIGN KEY (nutrient_id) REFERENCES nutrients(nutrient_id),
--   FOREIGN KEY (unit_id) REFERENCES units(unit_id)
-- );
CREATE TABLE food_nutrients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  food_id INT,
  nutrient_id INT,
  unit_id INT,
  amount DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (food_id) REFERENCES foods(food_id),
  FOREIGN KEY (nutrient_id) REFERENCES nutrients(nutrient_id),
  FOREIGN KEY (unit_id) REFERENCES units(unit_id)
);

CREATE INDEX idx_food_id ON food_nutrients(food_id);

CREATE INDEX idx_nutrient_id ON food_nutrients(nutrient_id);

CREATE INDEX idx_unit_id ON food_nutrients(unit_id);

-- Food items
INSERT INTO
  foods (name, description)
VALUES
  (
    'Apple',
    'A sweet, edible fruit produced by an apple tree'
  );

INSERT INTO
  foods (name, description)
VALUES
  (
    'Banana',
    'An elongated, edible fruit produced by several kinds of large herbaceous flowering plants'
  );

-- Nutrients
INSERT INTO
  nutrients (name)
VALUES
  ('Calories');

INSERT INTO
  nutrients (name)
VALUES
  ('Protein');

INSERT INTO
  nutrients (name)
VALUES
  ('Fat');

INSERT INTO
  nutrients (name)
VALUES
  ('Carbohydrates');

-- Units
INSERT INTO
  units (name, conversion_factor)
VALUES
  ('g', 1.00000);

-- Grams as base unit
INSERT INTO
  units (name, conversion_factor)
VALUES
  ('oz', 28.3495);

-- 1 oz = 28.3495 g
-- FoodNutrient relationships
-- Apple
INSERT INTO
  food_nutrients (food_id, nutrient_id, unit_id, amount)
VALUES
  (1, 1, 1, 52.00);

-- 52 kcal
INSERT INTO
  food_nutrients (food_id, nutrient_id, unit_id, amount)
VALUES
  (1, 2, 1, 0.26);

-- 0.26 g Protein
INSERT INTO
  food_nutrients (food_id, nutrient_id, unit_id, amount)
VALUES
  (1, 3, 1, 0.17);

-- 0.17 g Fat
INSERT INTO
  food_nutrients (food_id, nutrient_id, unit_id, amount)
VALUES
  (1, 4, 1, 14.00);

-- 14 g Carbohydrates
-- Banana
INSERT INTO
  food_nutrients (food_id, nutrient_id, unit_id, amount)
VALUES
  (2, 1, 1, 96.00);

-- 96 kcal
INSERT INTO
  food_nutrients (food_id, nutrient_id, unit_id, amount)
VALUES
  (2, 2, 1, 1.29);

-- 1.29 g Protein
INSERT INTO
  food_nutrients (food_id, nutrient_id, unit_id, amount)
VALUES
  (2, 3, 1, 0.33);

-- 0.33 g Fat
INSERT INTO
  food_nutrients (food_id, nutrient_id, unit_id, amount)
VALUES
  (2, 4, 1, 27.00);

-- 27 g Carbohydrates
SELECT
  f.name AS food_name,
  n.name AS nutrient_name,
  fn.amount * u.conversion_factor AS amount_in_grams,
  'g' AS unit
FROM
  foods f
  JOIN food_nutrients fn ON f.food_id = fn.food_id
  JOIN nutrients n ON fn.nutrient_id = n.nutrient_id
  JOIN units u ON fn.unit_id = u.unit_id
WHERE
  f.name = 'Apple';

SELECT
  f.name AS food_name,
  n.name AS nutrient_name,
  fn.amount * u.conversion_factor / (
    SELECT
      conversion_factor
    FROM
      units
    WHERE
      name = 'oz'
  ) AS amount_in_ounces,
  'oz' AS unit
FROM
  foods f
  JOIN food_nutrients fn ON f.food_id = fn.food_id
  JOIN nutrients n ON fn.nutrient_id = n.nutrient_id
  JOIN units u ON fn.unit_id = u.unit_id
WHERE
  f.name = 'Apple';