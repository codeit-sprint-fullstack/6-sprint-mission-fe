import { useState } from "react";

export default function MultiInputForm() {
  const [formDataState, setFormDataState] = useState({
    name: "",
    title: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSumit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", formDataState.name);
    formData.append("title", formDataState.title);
    formData.append("email", formDataState.email);
    formData.append("password", formDataState.password);

    const result = await createReview(formData);
    onSubmitSuccess(result.review);

    setFormDataState({ name: "", title: "", email: "", password: "" });
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="border rounded-lg p-2 w-64"
        placeholder="Enter your name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="border rounded-lg p-2 w-64"
        placeholder="Enter your email"
      />
      <div className="text-lg font-semibold">
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
      </div>
    </div>
  );
}
