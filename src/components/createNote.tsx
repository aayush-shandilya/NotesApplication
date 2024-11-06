
import { InputBase, Box, Button, styled, Typography } from "@mui/material";
import { useState } from "react";
import { NoteObject } from "../models/notes";
import { TITLE_LIMIT, DETAIL_LIMIT } from "../constants/constant";
import {v4 as uuid} from 'uuid';

const Container = styled(Box)(`
    & > * {
        margin: 20px 20px 20px 0;
    }
    & > div > input[type="text"] {
        border-bottom: 1px solid #111111;
        opacity: 0.4;
        width: 300px;
        padding-right: 25px;
    }
    & > div > input[type="color"] {
        width: 40px;
        height: 30px;
        position: relative;
        bottom: -10px;
    }
    & > span {
        font-size: 14px;
    }
`);
const Error=styled(Typography)`
    background:red;
    color:#fff;
    padding:10px;
    width:50%;
`;
const defaultobj:NoteObject={
    id:0,
    title:'',
    details:'',
    color:'',
    date:(new Date().toLocaleString()).toString(),

};

interface ICreateNoteProps{
    addNotes:(note: NoteObject) => void;
}

const CreateNote: React.FC<ICreateNoteProps> = ({addNotes}) => {
    const [note,setNote]=useState<NoteObject>(defaultobj);
    const [error, setError] = useState<string>('');

        const onValueChange=(e:React.ChangeEvent<HTMLTextAreaElement| HTMLInputElement>)=>{
            if(error)
            {
                setError('');
            }
        setNote({...note,[e.target.name]:e.target.value})
    }

    const onCreateNote=()=>
    {
        if(!note.title && !note.details)
        {
            setError('All fields are mandatory');
            return;
        }
        addNotes({...note,id:uuid()})
        setNote(defaultobj);
    }
    return (
        <Container>
            <InputBase placeholder="Title" 
                onChange={(e)=>onValueChange(e)}
                name="title"
                value={note.title}
                inputProps={{
                    maxLength:TITLE_LIMIT
                }}
            />
            <Box component="span">{note.title.length}/{TITLE_LIMIT}</Box>
            <InputBase placeholder="Details" 
                onChange={(e)=>onValueChange(e)}
                name="details"
                value={note.details}
                inputProps={{
                    maxLength:DETAIL_LIMIT,
                }}
            />
            <Box component="span">{note.details.length}/{DETAIL_LIMIT}</Box>
            <InputBase
                type="color"
                defaultValue="#F5F5F5"
                placeholder="Choose color"
                onChange={(e)=>onValueChange(e)}
                name="color"
            
            />
            <Button
             variant="outlined"
             onClick={()=>onCreateNote()}
             >Create</Button>

             {error && <Error>{error}</Error>}

        </Container>
    );
};

export default CreateNote;