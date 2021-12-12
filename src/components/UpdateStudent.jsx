import { Button, Modal } from 'react-bootstrap';
import { useState, useRef,useEffect } from 'react'

function UpdateStudent({toggleEdit,hideModal,updateStudent}) {

    const [show, setShow] = useState(false);
    const clearInputVal = useRef(null)


    const handleClose = () => {
        setShow(false)
        hideModal(false)
    }
 

    useEffect(() => {

        setShow(toggleEdit)
        
    }, [toggleEdit])
    
    //// storing the updated data

    const [updateData, setUpdateData] = useState({
        first_name:'',
        last_name:'',
        field_of_study:'',
        age:null,
})
    const handleChange = (e) => {
        setUpdateData({ ...updateData, [e.target.name]: e.target.value })
    }
    const sendUpdateStudent = () => {
        updateStudent(updateData)
        clearInputVal.current.value = ''
        hideModal(false)
    }

    return (
        <>
           
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Student Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-md-8 offset-2">




                        <div class="mb-3 ">
                            <label class="form-label">First Name</label>
                            <input ref={clearInputVal} onChange={handleChange} name="first_name" type="text" class="form-control" />

                        </div>

                        <div class="mb-3 ">
                            <label class="form-label">Last Name</label>
                            <input ref={clearInputVal} onChange={handleChange} name="last_name" type="text" class="form-control" />
                        </div>



                        <div class="mb-3 ">
                            <label class="form-label">Field Of Study</label>
                            <input ref={clearInputVal} onChange={handleChange} name="field_of_study" type="text" class="form-control" />
                        </div>

                        <div class="mb-3 ">
                            <label class="form-label">Age</label>
                            <input ref={clearInputVal} onChange={handleChange} name="age" type="number" class="form-control" />
                        </div>


                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={sendUpdateStudent}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateStudent