import { Text } from '@mantine/core'
import React from 'react'
import { useFetchAffectationResult } from './connection'
import  { ResultTable } from './resulTabl'

function ResultAffectation() {


    // !! fetch result of affectation for students 
    // fetch list of theme and list of students 
    const {data :  fetchAffectationResult  } = useFetchAffectationResult()  ; 

    console.log(fetchAffectationResult?.data) ; 

  return (
    
            <>
                <div className='Student-managment'>

                    <div className='Student-managment-menu'  >

                        
                            <div className='specialtyName' > <h3>  <Text fz="lg" color='teal' ></Text> Result of affectation </h3> </div>
                  
                        {/* < TeamsCrud /> */}
                        <ResultTable/>

                 
                    </div>

                </div>
            </>
  )
}

export default ResultAffectation