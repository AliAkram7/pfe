import {DndContext, closestCenter} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import React, {useState} from "react";
import PageNotUploadedYet from "../errorpages/pageUploadedYet/pageNotUploadedYet";
import "./disserForm.css";
import {Row} from "./sortableRow";
import {useDisclosure} from "@mantine/hooks";
import SendData from "./sendData";
import {Overlay} from "@mantine/core";
// import { useFetchTheme } from "./connection/receiveData/fetchData";

function DisserForm() {

     //   ! fetch all theme from db 
     //  * const { data:Fetchedtheme } = useFetchTheme(onSuccess, onError)


    let data = [
        {
            id: 1,
            name: "Application des 1"
        },
        {
            id: 2,
            name: "Application des 2"
        },
        {
            id: 3,
            name: "Application des 3"
        },
        {
            id: 4,
            name: "Application des 4"
        }, {
            id: 5,
            name: "Application des 5"
        }


    ];

    // data = null ;
    if (data == null) {

        return <PageNotUploadedYet/>

    }


    let themeTable = data;


    const [theme, setTheme] = useState(themeTable);
    const [opened, {
            close,
            open
        }
    ] = useDisclosure(false);

    return (
        <>
            <SendData opened={opened}
                close={close}
                data={theme}/>

            {/* <div className='main-page-name'>
                <h1>your theme</h1>

            </div> */}
            <div className='disser-section'>

                <div className='conformation'>

                    <label>complete and send</label>
                    <button onClick={open}>
                        now
                    </button>
                    {/* <Overlay gradient={`linear-gradient(105deg, black 10%, #312f2f 50%, grey 100%)`}/>   */}
                     </div>

                <div className='table-section'>

                    <DndContext collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}>
                        
                        <SortableContext items={theme}
                            strategy={verticalListSortingStrategy}>
                            <table className='table-theme'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>id</th>
                                        <th>Thème</th>
                                        <th>rank</th>
                                    </tr>
                                </thead>

                                <tbody>{
                                    theme.map((item, idx) => (
                                        <Row key={
                                                item.id
                                            }
                                            id={
                                                item.id
                                            }
                                            name={
                                                item.name
                                            }
                                            index={idx}/>
                                    ))
                                }</tbody>
                            </table>
                        </SortableContext>
                    </DndContext>
                    {/* <Overlay opacity={0.2} color="white" zIndex={1} /> */}
                     </div>
            </div>
        </>
    );

    function handleDragEnd(event) { // console.log("drag ended called");


        const {active, over} = event;

        if (over == null) {
            return null
        }
        if (active.id !== over.id) {
            setTheme((items) => {
                const activeIndex = items.map(e => e.id).indexOf(active.id);;

                const overIndex = items.map(e => e.id).indexOf(over.id);;
                // console.log(activeIndex, overIndex);

                // console.log(activeIndex, overIndex);
                return arrayMove(items, activeIndex, overIndex);
            });
        }
    }
}

export default DisserForm;
