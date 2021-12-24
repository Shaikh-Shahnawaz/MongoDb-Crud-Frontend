

const ShowStudentDetails = ({studentsData,deleteStudent,openModal})=>{

  

    return(
        <>
         
        <div className="container mt-5">
        <h2 className="text-center">Showing Student Details</h2>
        <table class="table table-hover bg-light text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Field of Study</th>
                            <th scope="col">Age</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            studentsData.map((ele,index)=>(
                                <tr>
                                <th scope="row">{index+1}</th>
                                <td>{ele.first_name}</td>
                                <td>{ele.last_name}</td>
                                <td>{ele.field_of_study}</td>
                                <td>{ele.age}</td>
                                <td>
                                    <button onClick={()=>openModal(ele._id)} className="btn btn-warning">Edit</button>
                                    <button onClick={()=>deleteStudent(ele._id)} className="btn btn-danger ms-2">Delete</button>
                                </td>
                            </tr>
                            ))
                        }
                       
                       
                    </tbody>
                </table>
               
        </div>
        </>
    )
}

export default ShowStudentDetails