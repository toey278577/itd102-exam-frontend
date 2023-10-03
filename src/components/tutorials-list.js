import React, { Component } from 'react';
import StudentDataService from '../services/tutorial.service';
import { Link } from 'react-router-dom';

export default class StudentList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchname = this.onChangeSearchname.bind(this);
    this.retrieveStudent = this.retrieveStudent.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveStudent = this.setActiveStudent.bind(this);
    this.removeAllStudents = this.removeAllStudents.bind(this);
    this.Searchname = this.Searchname.bind(this);

    this.state = {
      students: [],
      currentStudent: null,
      currentIndex: -1,
      Searchname: ""
    };
  }

  componentDidMount() {
    this.retrieveStudent();
  }

  onChangeSearchname(e){
    const Searchname = e.target.value;
    this.setState({
      Searchname: Searchname
    });
  }

  retrieveStudent(){
    StudentDataService.getAll()
      .then(response => {
        this.setState({
          students: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  refreshList(){
    this.retrieveStudents();
    this.setState({
      currentStudent: null,
      currentIndex: -1
    });
  }

  setActiveStudent(student, index){
    this.setState({
      currentStudent: student,
      currentIndex: index
    });
  }

  removeAllStudents(){
    StudentDataService.deleteAll()
    .then(response => {
      this.refreshList();
    })
    .catch(err => {
      console.log(err);
    });
  }

  Searchname(){
    StudentDataService.findByName(this.state.Searchname)
      .then(response => {
        this.setState({
          student: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const {Searchname, students, currentStudent, currentIndex} = this.state;

    return (
      <div className='list row'>
        <div className='col-md-8'>
          <div className='input-group mb-3'>
              <input
                type="text"
                className="form-control"
                placeholder="Search Name "
                value={Searchname}
                onChange={this.onChangeSearchname}
              />
            <div className='input-group-append'>
              <button
                className='btn btn-outline-secondary'
                type='button'
                onClick={this.Searchname}
              >Search</button>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <h4>Finish Studying</h4>

          <ul className='list-group'>
            {students && students.map((student, index) => (
              <li className={"list-group-item " + (index === currentIndex ? "active" : "")} 
              onClick={() => this.setActiveStudent(student, index)}
              key={index}>
                {student.name}
              </li>
            ))}
          </ul>

          <button
            className='btn btn-sm btn-danger m-3'
            onClick={this.removeAllStudents}
          >
            Remove All
          </button>
        </div>
        <div className='col-md-6'>
              {currentStudent ? (
              <div>
                <h4>Student Detail</h4>
                <div>
                  <label>
                    <strong>Name :</strong>
                  </label>
                  {" "}
                  {currentStudent.name}
                </div>
                <div>
                  <label>
                    <strong>Lastname :</strong>
                  </label>
                  {" "}
                  {currentStudent.lastname}
                </div>
                <div>
                  <label>
                    <strong>univercity :</strong>
                  </label>
                  {" "}
                  {currentStudent.univercity}
                </div>
                <div>
                  <label>
                    <strong>Stutus :</strong>
                  </label>
                  {" "}
                  {currentStudent.education ? "Education" : "Pending"}
                </div>
              </div>
              ) : (
              <div>
                <br />
                <p>Please click on a Student ...</p>
              </div>
              )}
        </div>
      </div>
    )
  }
}
