import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      form: { name: "", email: "", phone: "" },
      indexSelected: -1,
      isValid: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState((state) => {
      const form = { ...state.form, [name]: value };
      return { form };
    }, this.checkInvalidForm);
  }

  handleSelect = (studentSelected, index) => {
    this.setState({
      form: { ...studentSelected },
      indexSelected: index
    });
  }

  checkInvalidForm = () => {
    const { name, phone, email } = this.state.form;
    const isValid = name.trim() && phone.trim() && email.trim();
    this.setState({ isValid });
  }

  handleSubmit = () => {
    if (this.state.isValid) {
      const { form, list, indexSelected } = this.state;
      const newList = [...list];
      
      if (indexSelected > -1) {
        newList[indexSelected] = form;
      } else {
        newList.push(form);
      }

      this.setState({
        list: newList,
        form: { name: "", email: "", phone: "" },
        indexSelected: -1,
        isValid: false,
      });
    }
  }

  handleDelete = (index) => {
    const newList = [...this.state.list];
    newList.splice(index, 1);
    this.setState({ list: newList });
  };

  render() {
    const { list, form } = this.state;
    return (
      <div>
        <h1>Student List</h1>
        <div>
          <label>Name: </label>
          <input name="name" value={form.name} onChange={this.handleChange} />
        </div>
        <div>
          <label>Phone: </label>
          <input type="number" name="phone" value={form.phone} onChange={this.handleChange} />
        </div>
        <div>
          <label>Email: </label>
          <input name="email" value={form.email} onChange={this.handleChange} />
        </div>
        <button onClick={this.handleSubmit} disabled={!this.state.isValid}>Submit</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>
                  <button onClick={() => this.handleSelect(item, index)}>Edit</button>
                  <button onClick={() => this.handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
