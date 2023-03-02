import React from 'react'

export function Filter(props) { // return (<tr>{props.searchVal }{ props.searchField}{props.data[].student_name}</tr>);


    switch (props.searchField) {
        case 'name':
            if (props.searchVal.length > 0) {
                return props.data.map((row) => {
                    if (row.student_name.match(props.searchVal)) {
                        return (
                            <tr className="ranking-result-search"
                                key={
                                    row.student_name
                            }>
                                <td>
                                    {row.code}
                                </td>
                                <td>{

                                    row.student_name
                                }</td>
                                <td>{
                                    row.rank
                                }</td>
                                <td>{
                                    row.observation
                                }</td>
                                <td>{
                                    row.ms1
                                }</td>
                                <td>{
                                    row.ms2
                                }</td>
                                <td>{
                                    row.mgc
                                }</td>
                            </tr>
                        );
                    }
                });
            }

            break;
        case 'rank':
            if (props.searchVal.length > 0) {
                return props.data.map((row) => {
                    if (row.rank == props.searchVal) {
                        return (
                            <tr className="ranking-result-search"
                                key={
                                    row.student_name
                            }>
                                <td>
                                    {row.code}
                                </td>
                                <td>{
                                    row.student_name
                                }</td>
                                <td>{
                                    row.rank
                                }</td>
                                <td>{
                                    row.observation
                                }</td>
                                <td>{
                                    row.ms1
                                }</td>
                                <td>{
                                    row.ms2
                                }</td>
                                <td>{
                                    row.mgc
                                }</td>
                            </tr>
                        );
                    }
                });
            }

            break;
        case 'observation':
            if (props.searchVal.length > 0) {
                return props.data.map((row) => {
                    if (row.observation == props.searchVal) {
                        return (
                            <tr className="ranking-result-search"
                                key={
                                    row.student_name
                            }>
                                <td>
                                    {row.code}
                                </td>
                                <td>{
                                    row.student_name
                                }</td>
                                <td>{
                                    row.rank
                                }</td>
                                <td>{
                                    row.observation
                                }</td>
                                <td>{
                                    row.ms1
                                }</td>
                                <td>{
                                    row.ms2
                                }</td>
                                <td>{
                                    row.mgc
                                }</td>
                            </tr>
                        );
                    }
                });
            }

            break;
        case 'ms1':
            if (props.searchVal.length > 0) {
                return props.data.map((row) => {
                    if (row.ms1.match(props.searchVal)) {
                        return (
                            <tr className="ranking-result-search"
                                key={
                                    row.student_name
                            }>
                                <td>
                                    {row.code}
                                </td>
                                <td>{
                                    row.student_name
                                }</td>
                                <td>{
                                    row.rank
                                }</td>
                                <td>{
                                    row.observation
                                }</td>
                                <td>{
                                    row.ms1
                                }</td>
                                <td>{
                                    row.ms2
                                }</td>
                                <td>{
                                    row.mgc
                                }</td>
                            </tr>
                        );
                    }
                });
            }
            break;
        case 'ms2':
            if (props.searchVal.length > 0) {
                return props.data.map((row) => {
                    if (row.ms2.match(props.searchVal)) {
                        return (
                            <tr className="ranking-result-search"
                                key={
                                    row.student_name
                            }>
                                <td>
                                    {row.code}
                                </td>
                                <td>{
                                    row.student_name
                                }</td>
                                <td>{
                                    row.rank
                                }</td>
                                <td>{
                                    row.observation
                                }</td>
                                <td>{
                                    row.ms1
                                }</td>
                                <td>{
                                    row.ms2
                                }</td>
                                <td>{
                                    row.mgc
                                }</td>
                            </tr>
                        );
                    }
                });
            }
            break;
        case 'mgc':
            if (props.searchVal.length > 0) {
                return props.data.map((row) => {
                    if (row.mgc.match(props.searchVal)) {
                        return (
                            <tr className="ranking-result-search"
                                key={
                                    row.student_name
                            }>
                                <td>
                                    {row.code}
                                </td>
                                <td>{
                                    row.student_name
                                }</td>
                                <td>{
                                    row.rank
                                }</td>
                                <td>{
                                    row.observation
                                }</td>
                                <td>{
                                    row.ms1
                                }</td>
                                <td>{
                                    row.ms2
                                }</td>
                                <td>{
                                    row.mgc
                                }</td>
                            </tr>
                        );
                    }
                });
            }
            break;
        default:
            break;
    }


}

export default Filter
