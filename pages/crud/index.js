import axios from "axios";
import { useState } from "react";

const CrudPage = ({ articlesData }) => {
  //state merupakan keadaan, yang datanya bisa diubah sesuai dengan kebutuhan
  //pada useState dia return 2, yang pertama adalah statenya dan kedua adalah function setStatenya
  const [count, setCount] = useState(0);
  const [form, setForm] = useState({
    title: "",
    body: "",
  });
  const [articels, setArticels] = useState(articlesData);
  const [editedId, setEditedId] = useState(null);

  const onChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveArticel = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify(form);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        body,
        config
      );

      const newArticle = response.data;

      setArticels([...articels, newArticle]);

      setForm({
        title: "",
        body: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateArticle = (e) => {
    e.preventDefault();

    //tambahkan axios disini

    const updatedArticles = articels.map((article) =>
      article.id === editedId ? form : article
    );

    setArticels(updatedArticles);

    setForm({
      title: "",
      body: "",
    });
  };

  const editData = (id) => {
    const filteredArticleById = articels.find((article) => article.id === id);
    const { title, body } = filteredArticleById;
    setForm({
      title,
      body,
    });
    setEditedId(id);
  };

  return (
    <div className="container">
      {/* <div className="mt-3 d-flex">
        <button onClick={() => setCount(count + 1)} className="btn btn-primary">
          Increament{" "}
        </button>
        <h1>{count}</h1>
        <button onClick={() => setCount(count - 1)} className="btn btn-primary">
          Decreament{" "}
        </button>
      </div> */}
      <div className="mt-3 card">
        <div className="card-header">
          <h3>CRUD</h3>
        </div>
        <div className="card-body">
          <form
            onSubmit={(e) => {
              if (editedId) {
                updateArticle(e);
              } else {
                saveArticel(e);
              }
            }}
          >
            <div className="form-body">
              <label>Title</label>
              <input
                name="title"
                value={form.title}
                onChange={(e) => onChangeForm(e)}
                type="text"
                className="form-control"
                required
              />
            </div>

            <div className="form-body">
              <label>Description</label>
              <textarea
                value={form.body}
                name="body"
                onChange={(e) => onChangeForm(e)}
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="mt-3 form-body">
              <button
                className="btn btn-primary"
                type="submit"
                style={{
                  width: "100%",
                }}
                disabled={!form.title || !form.body ? true : false}
              >
                {editedId ? "Update" : "Simpan"}
              </button>
            </div>
            <div className="mt-3">
              <pre>{JSON.stringify(form, 2, null)}</pre>
            </div>
            <div className="mt-3">
              <pre>{JSON.stringify(articels, 2, null)}</pre>
            </div>
          </form>

          <table className="table mt-3 table-striped table-bordered table-hovered">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {articels.map((article, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{article.title}</td>
                    <td>{article.body}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => editData(article.id)}
                        className="btn btn-success btn-sm"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

CrudPage.getInitialProps = async (context) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );

    return {
      articlesData: response.data,
    };
  } catch (error) {
    console.log(error);
  }
};

export default CrudPage;
