import React, { Component } from 'react';
import StudentDataService from '../services/tutorial.service';

export default class AddTutorial extends Component {
  constructor(props){  //ทำทันที
    super(props);  // ส่งให้คลาสแม่

    this.onChangeid = this.onChangeid.bind(this);
    this.onChangename = this.onChangename.bind(this);
    this.onChangelastname = this.onChangelastname.bind(this);
    this.onChangeunivercity = this.onChangeunivercity.bind(this);
    this.saveStudent = this.saveStudent.bind(this);
    this.newstudents= this.newstudents.bind(this);

    this.state = {
      id: null,
      studentsID: "",
      name: "",
      lastname: "",
      univercity: "",
      education: false,
      submitted: false
    }
  }
  onChangeid(e) {
    this.setState({
      ID: e.target.value
    });
  }

  onChangename(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangelastname(e) {
    this.setState({
      lastname: e.target.value
    });
  }

  onChangeunivercity(e) {
    this.setState({
      univercity: e.target.value
    });
  }

  saveStudent() {
    var data = {
      id: this.state.id,
      name: this.state.name,
      lastname: this.state.lastname,
      univercity: this.state.univercity
    };

    StudentDataService.create(data)
      .then( response => {
        this.setState({
          id: response.data.id,
          studentsID: response.data.studentsID,
          name: response.data.name,
          lastname: response.data.lastname,
          univercity: response.data.univercity,
          education: response.data.education,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  newstudents(){
    this.setState({
      id: null,
      studentsID: "",
      name: "",
      lastname: "",
      univercity: "",
      education: false,
      submitted: false
    });
  }

  render() {
    return (
      <div className='submit-form'>
        {this.state.submitted ? (
          <>
            <h4>You submitted successfully</h4>
            <button className='btn btn-success' onClick={this.newstudents}>Add</button>
          </>
        ) : (
          <>
            <div className='form-group'>
              <label htmlFor='title'>ID: {this.state.id}</label>
              <input type='text' 
                className='form-control' 
                id='ID' value={this.state.id}
                onChange={this.onChangeid}
                name='ID'
                required />
            </div>
            <div className='form-group'>
              <label htmlFor='title'>ชื่อ : {this.state.name}</label>
              <input type='text' 
                className='form-control' 
                id='name' value={this.state.name}
                onChange={this.onChangename}
                name='name'
                required />
            </div>
            <div className='form-group'>
              <label htmlFor='lastname'>นามสกุล : {this.state.lastname}</label>
              <input type='text' 
                className='form-control' 
                id='lastname' value={this.state.lastname}
                onChange={this.onChangelastname}
                name='lastname'
                required />
            </div>
            <div className='form-group'>
              <label htmlFor='univercity'>มหาวิทยาลัย :{this.state.univercity}</label>
              <input type='text' 
                className='form-control' 
                id='univercity' value={this.state.univercity}
                onChange={this.onChangeunivercity}
                name='univercity'
                required />
            </div>
            

            <button onClick={this.saveStudent} 
              className='btn btn-success'>
                Submit
            </button>
          </>
        )}
      </div>
    )
  }
}
