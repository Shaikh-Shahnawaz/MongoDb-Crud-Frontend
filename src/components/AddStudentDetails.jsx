import { useEffect, useState , useRef} from "react"
import axios from "axios"
import ShowStudentDetails from './ShowStudentDetails'
import UpdateStudent from "./UpdateStudent"

const AddStudentDetails = () => {

    const [studentsData,setStudentsData]= useState([])
    const [deleted,setDeleted] = useState(false)
    const [edited,setEdited] = useState(false)
    // Ref For clearing the add input
    const clearInputVal = useRef('')
    // [ =========================== Get Request ===========================  ]

    const getStudent = ()=>{
        const URL = 'http://localhost:8080/api/students/getAllData'
        axios.get(URL).then((res)=>{
            // console.log(res.data.data)
            setStudentsData(res.data.data)
        }).catch(err=>console.log(err))
    }

    console.log(studentsData)
    useEffect(()=>{
    
        getStudent()
        
    },[deleted,edited])
    
    
    // [ =========================== Post Request ===========================  ]
    
    
const [inputData,setInputData] = useState({
        first_name:'',
        last_name:'',
        field_of_study:'',
        age:null,
})

const handleChange = (e)=>{
    setInputData({...inputData,[e.target.name]:e.target.value})
}

const AddStudent = ()=>{

    const URL = 'http://localhost:8080/api/students/insertOne'
    const payload = inputData
    console.log(payload)
    axios.post(URL,payload).then((res)=>{
        setStudentsData([...studentsData,res.data.data])
    }).catch(err=>console.log(err))
    
    clearInputVal.current.value = ''
}
// [ =========================== Delete Request ===========================  ]

const deleteStudent = (id)=>{
    
    // const URL = 'http://localhost:8080/api/students/deleteById'
    // axios.delete(URL,id).then((res)=>{
        
    // }).catch(err=>console.log(err))
    
    axios.delete(`http://localhost:8080/api/students/deleteByParamsId/${id}`).then((res)=>{
        
            setDeleted(!deleted)
            
        }).catch(err=>console.log(err))
        
    }
    // [ =========================== Put Request ===========================  ]
const [editId,setEditId] = useState()
const [toggleEdit,setToggleEdit] = useState(false)

    const openModal = (id)=>{
        console.log('open modal',id)
        setEditId(id)
        setToggleEdit(true)

    }
    const hideModal = (val)=>{
        setToggleEdit(val)
    }

 const updateStudent = (data)=>{
     
     axios.put(`http://localhost:8080/api/students/updateByParamsId/${editId}`,data).then((res)=>{
        setEdited(!edited)
        console.log('put request')
        // setStudentsData([...studentsData,res.data.data])
     }).catch(err=>console.log(err))
 }   


    return (
        <>
            <h1 className="bg-dark text-light py-2 text-center" >MongoDb Crud Operation </h1>
            <div className="container mt-3">
                <h2 className="text-center" >Add Student Details </h2>

                {/* =============Adding Studets Detail============= */}
               
                <div className="col-md-8 offset-2">


                    <div className="row">

                        <div class="mb-3 col-md-6">
                            <label class="form-label">First Name</label>
                            <input ref={clearInputVal} onChange={handleChange} name="first_name" type="text" class="form-control" />

                        </div>

                        <div class="mb-3 col-md-6">
                            <label class="form-label">Last Name</label>
                            <input ref={clearInputVal} onChange={handleChange} name="last_name" type="text" class="form-control" />
                        </div>

                    </div>

                    <div className="row">

                        <div class="mb-3 col-md-6">
                            <label class="form-label">Field Of Study</label>
                            <input ref={clearInputVal} onChange={handleChange} name="field_of_study" type="text" class="form-control" />
                        </div>

                        <div class="mb-3 col-md-6">
                            <label class="form-label">Age</label>
                            <input ref={clearInputVal} onChange={handleChange} name="age" type="number" class="form-control" />
                        </div>

                    </div>

                    <button onClick={AddStudent} type="submit" class="btn w-100 btn-outline-warning">Submit</button>

                </div>
            </div>
                       {/* =============Adding Studets Detail============= */}
                <ShowStudentDetails studentsData={studentsData} deleteStudent={deleteStudent} openModal={openModal} />
                       {/* =============Updating Studets Detail============= */}
                <UpdateStudent toggleEdit={toggleEdit} hideModal={hideModal} updateStudent={updateStudent} />
        </>
    )
}

export default AddStudentDetails