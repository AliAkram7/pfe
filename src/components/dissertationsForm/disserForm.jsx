import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import React, { useEffect, useState } from "react";
import PageNotUploadedYet from "../errorpages/pageUploadedYet/pageNotUploadedYet";
import "./disserForm.css";
import { Row } from "./sortableRow";
import { useDisclosure } from "@mantine/hooks";
import SendData from "./sendData";
import { useFetchTheme } from "./connection/receiveData/fetchData";

function DisserForm() {

    const { data: fetchedTheme } = useFetchTheme( )




    // useEffect(() => {
    //     // data = fetchedTheme?.data.list_theme
    // }, [fetchedTheme?.data.list_theme])
    

    // if (data == null) {

    //     return <PageNotUploadedYet />

    // }


    let themeTable = fetchedTheme?.data?.list_theme ;




    


    const [theme, setTheme] = useState(fetchedTheme?.data?.list_theme);





    useEffect(() => {
        setTheme(fetchedTheme?.data?.list_theme)
    }, [fetchedTheme?.data?.list_theme])

    const [opened, {
        close,
        open
    }
    ] = useDisclosure(false);

    return (
        <>
           {
            theme ? 
           <SendData opened={opened}
                close={close}
                data={theme} /> : null }

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

        
                    {   
                    theme ? 
                     <SortableContext items={theme}
                            strategy={verticalListSortingStrategy}>
                            <table className='table-theme'>
                                <thead>
                                    <tr>
                                        <th></th>
                                        {/* <th>id</th> */}
                                        <th>Theme</th>
                                        <th>rank</th>
                                    </tr>
                                </thead>
                                <tbody>{
                                    theme?.map((item, idx) =>
                                     (
                                        <Row key={
                                            item?.id
                                        }
                                            id={
                                                item?.id
                                            }
                                            name={
                                                item?.title
                                            }
                                            index={idx} />
                                    ))
                                }</tbody>
                            </table>
                        </SortableContext> :  'loading...'  }
                    </DndContext>
                    {/* <Overlay opacity={0.2} color="white" zIndex={1} /> */}
                </div>
            </div>
        </>
    );

    function handleDragEnd(event) { // console.log("drag ended called");


        const { active, over } = event;

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
