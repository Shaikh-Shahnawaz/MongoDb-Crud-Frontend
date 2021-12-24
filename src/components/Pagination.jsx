import React from 'react'
import { useEffect } from 'react'

function Pagination({noOfPages,paginateData}) {

const sendPaginateData = (page)=>{
    paginateData(page)
}



    return (
        <div className="">
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    
                    <li class="page-item">
                        <a class="page-link"  aria-label="Previous">
                            <span  aria-hidden="true">&laquo;</span>
                            <span class="sr-only"></span>
                        </a>
                    </li>
                    {
                        noOfPages.map((ele)=>(

                            <li class="page-item"><button onClick={()=>sendPaginateData(ele)} class="page-link" >{ele+1}</button></li>
                        ))
                    }
                   <li>
                        <a class="page-link"  aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only"></span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination
