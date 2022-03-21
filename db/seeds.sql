INSERT INTO departments (name)
VALUES
  ('testing'),
  ('deployment'),
  ('fixing');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('lead tester', '70000.00', 1),
  ('line tester', '50000.00', 1),
  ('lead deployment', '80000.00', 2),
  ('line deployment', '60000.00', 2),
  ('lead fixer', '60000.00', 3),
  ('line fixer', '40000.00', 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 2, 1),
  ('Piers', 'Gaveston', 2, 1),
  ('Charles', 'LeRoi', 3, NULL),
  ('Katherine', 'Mansfield', 4, 4),
  ('Dora', 'Carrington', 5, NULL),
  ('Edward', 'Bellamy', 6, 6),
  ('Montague', 'Summers', 6, 6),
  ('Octavia', 'Butler', 6, 6),
  ('Unica', 'Zurn', 6, 6);