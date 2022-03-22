INSERT INTO departments (name)
VALUES
  ('Testing'),
  ('Deployment'),
  ('Fixing');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Lead Tester', '70000.00', 1),
  ('Line Tester', '50000.00', 1),
  ('Lead Deployment', '80000.00', 2),
  ('Line Deployment', '60000.00', 2),
  ('Lead Fixer', '60000.00', 3),
  ('Line Fixer', '40000.00', 3);

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