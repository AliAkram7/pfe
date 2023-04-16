import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {IconGripVertical} from "@tabler/icons";
import { nanoid } from "nanoid";

export function Row(props) { //
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: props?.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        // boxShadow:'0.02px 1px 0.02px 0.02px  black',
    }

    return (
        <tr ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            key={nanoid()} 
        >
            <td>
                <IconGripVertical size={18}
                    stroke={1.5}/>
            </td>
            {/* <td>{
                props.id
            }</td> */}
            <td>{
                props.name
            }</td>
            
            <td>{
                props.index + 1
            }</td>
        </tr>
    );
}
