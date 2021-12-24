import { useEffect, useState , useRef} from "react"
import axios from "axios"
import ShowStudentDetails from './ShowStudentDetails'
import UpdateStudent from "./UpdateStudent"

import Pagination from "./Pagination"
import _ from "lodash"

const AddStudentDetails = () => {

    const [studentsData,setStudentsData]= useState([])
    const [deleted,setDeleted] = useState(false)
    const [edited,setEdited] = useState(false)
    // Ref For clearing the add input
    const clearInputVal = useRef('')

    // [ =========================== Getting Data Via Post Request ===========================  ]

    // storing total count
    const [noOfPages,setNoOfPages] = useState([])
    const [totalCount,setTotalCount] = useState(0)
    // storing limit and page dynamically to sending in payload
    const [limit,setLimit] = useState(5)
    const [page,setPage] = useState(0)

    const getStudent = ()=>{
        const URL = 'http://localhost:8080/api/students/getAllData'
        // this is for pagination
        const payload = {limit:limit,page:page}
        axios.post(URL,payload).then((res)=>{
            setStudentsData(res.data.data)

            setTotalCount(res.data.totalCount)
            
            setNoOfPages([
               ..._.range(Math.ceil(totalCount/limit))
            ])
            
        }).catch(err=>console.log(err))
    }

    //  function for getting the paginate data
    const paginateData = (pageNum)=>{
        setPage(pageNum)
    }
    
    // ============================= Use Effect ============================= 
    useEffect(()=>{
    
        getStudent()
            
    },[deleted,edited,page,totalCount])
    
    
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
   
    axios.post(URL,payload).then((res)=>{
        setStudentsData([...studentsData,res.data.data])
    }).catch(err=>console.log(err))
    
    clearInputVal.current.value = ''
}
// [ =========================== Delete Request ===========================  ]

const deleteStudent = (id)=>{
    // axios.delete(url, { data: { foo: "bar" }, headers: { "Authorization": "***" } });
    const URL = 'http://localhost:8080/api/students/deleteById'

    axios.delete(URL,{data:{id:id}}).then((res)=>{
        setDeleted(!deleted)
    }).catch(err=>console.log(err))
    
    // axios.delete(`http://localhost:8080/api/students/deleteByParamsId/${id}`).then((res)=>{
        
    //         setDeleted(!deleted)
            
    //     }).catch(err=>console.log(err))
        
    }
    // [ =========================== Put Request ===========================  ]
const [editId,setEditId] = useState()
const [toggleEdit,setToggleEdit] = useState(false)

    const openModal = (id)=>{
       
        setEditId(id)
        setToggleEdit(true)

    }
    const hideModal = (val)=>{
        setToggleEdit(val)
    }

 const updateStudent = (data)=>{
     
    //  axios.put(`http://localhost:8080/api/students/updateByParamsId/${editId}`,data).then((res)=>{
    //     setEdited(!edited)
        
    //     // setStudentsData([...studentsData,res.data.data])
    //  }).catch(err=>console.log(err))
    data.id = editId
     axios.put(`http://localhost:8080/api/students/updateById`,data).then((res)=>{
        setEdited(!edited)
        
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
            {/* ===========Pagination=========== */}
            <Pagination noOfPages={noOfPages} paginateData={paginateData}  />
        </>
    )
}

export default AddStudentDetails