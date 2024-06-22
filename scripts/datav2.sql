CREATE TABLE foods (
  food_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

-- set index on name
CREATE INDEX foods_name_index ON foods(name);

-- Everything is in grams per 100 grams of food
create table food_nutrition (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  calories DECIMAL(10, 2) NOT NULL,
  protein DECIMAL(10, 2) NOT NULL,
  fat DECIMAL(10, 2) NOT NULL,
  carbohydrates DECIMAL(10, 2) NOT NULL,
  food_id INTEGER NOT NULL,
  FOREIGN KEY (food_id) REFERENCES foods(food_id)
);