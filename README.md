# BookStore - Backend

1. Create

```
const createAuthor = async (req, res) => {
  try {
    const author = new Author({ name: req.body.name });

    await author.save();

    res.status(201).json({
      success: true,
      data: author,
      message: `Author ${author.name} created!`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

```

2. Read

```
const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find().populate("books");

    res.status(200).json({
      success: true,
      data: authors,
      message: `${authors.length} authors found!`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
```

3. Update

```
const updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: author,
      message: `Author ${author.id} updated!`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

```

4. Delete

```
const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);

    res.status(204).json({
      success: true,
      data: author,
      message: `Deleted author ${author.id}`,
    });
  } catch (err) {
    res.status(400).json({
      success: fail,
      error: err.message,
    });
  }
};

```
