import React, { useState } from "react";
import { Navigate } from "react-router";
import { useStateContext } from "../../contexts/ContextProvider";
import { useFetchRanking } from "./connection/receiveData/fetchData";
// import { useFetchRanking } from "./connection/receiveData/fetchData";

import Filter from "./filter";
import "./ranking.css";
function Ranking() {

    const { data: ranking } = useFetchRanking()

    const student_rank = ranking?.data.student_rank.map((student, rank) => { return { ...student, rank: rank + 1 } })


    const displayData = student_rank?.map((student) => {


        return (
            <tr key={
                student.student_name
            }>
                <td>
                    {
                        student.code
                    }
                </td>
                <td>{
                    student.student_name
                }</td>
                <td>{
                    student.rank
                }</td>
                <td>{
                    student.observation
                }</td>
                <td>{
                    student.ms1
                }</td>
                <td>{
                    student.ms2
                }</td>
                <td>{
                    student.mgc
                }</td>
            </tr>
        );
    });


    const [searchVal, setSearchVal] = useState('')
    const [searchField, setSearchField] = useState('')

    const searchByCol = (searchVal, searchfield) => {

        setSearchVal(searchVal)
        setSearchField(searchfield)


    }


    return (
        <>
            {/* <div className='main-page-name'>
                <h1>ranking</h1>
            </div> */}

            <div className='table-section'>
                <h1>Classment des Etudiants de la Spécialité {ranking?.data.speciality_name} {ranking?.data.year_scholar}
                </h1>

                <div className='search-form'></div>
                <table className='table-ranking'>
                    <thead>

                        <tr>
                            <th></th>
                            <th>
                                <input type='text' className="ranking-search-bar"
                                    // value={search}
                                    name="name"
                                    placeholder="Student Name"
                                    onChange={
                                        (e) => {
                                            searchByCol(e.target.value, 'name')
                                        }
                                    } />
                            </th>
                            <th>
                                <input type='text' className="ranking-search-bar" name="rank" placeholder="rank"
                                    onChange={
                                        (e) => {
                                            searchByCol(e.target.value, 'rank')
                                        }
                                    } />
                            </th>
                            <th>
                                <select className="select-obs" name="obs"
                                    onChange={
                                        (e) => {
                                            searchByCol(e.target.value, 'observation')
                                        }
                                    }>
                                    <option value="">all observation</option>
                                    <option value={1}>Admis/S1</option>
                                    <option value="2">Admis/S2</option>
                                    <option value="3">Admis/Dettes/S2</option>
                                </select>

                            </th>
                            <th>
                                <input type='text' className="ranking-search-bar" placeholder="ms1"
                                    onChange={
                                        (e) => {
                                            searchByCol(e.target.value, 'ms1')
                                        }
                                    } />
                            </th>
                            <th>
                                <input type='text' className="ranking-search-bar" placeholder="ms2"
                                    onChange={
                                        (e) => {
                                            searchByCol(e.target.value, 'ms2')
                                        }
                                    } />
                            </th>
                            <th>
                                <input type='text' className="ranking-search-bar" placeholder="MGC"
                                    onChange={
                                        (e) => {
                                            searchByCol(e.target.value, 'mgc')
                                        }
                                    } />
                            </th>
                        </tr>
                        <Filter data={student_rank}
                            searchVal={searchVal}
                            searchField={searchField} />
                        <tr>
                            <th>code</th>
                            <th>student</th>
                            <th>rank</th>
                            <th>observation</th>
                            <th>ms1</th>
                            <th>ms2</th>
                            <th>mgc</th>
                        </tr>
                    </thead>
                    <tbody>{displayData}</tbody></table></div></>

    );
}

export default Ranking;
