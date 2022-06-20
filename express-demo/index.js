const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/courses", (req, res) => {
  res.send(courses);
});

app.post("/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.get("/courses/:id", (req, res) => {
  // prints parameters.
  // res.send(req.params.id);
  // prints optional parameters called query.
  // res.send(req.query);
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.put("/courses/:id", (req, res) => {
  // look up the course
  // if not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  // validate
  // if invalid, return 400 - bad request

  // const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // update course
  course.name = req.body.name;
  // return the updated course
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

app.delete("/courses/:id", (req, res) => {
  // look up the course
  // not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  // delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // return the same course
  res.send(course);
});
