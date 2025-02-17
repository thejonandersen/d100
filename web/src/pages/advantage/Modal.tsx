import React, {useEffect} from 'react';
import {Advantage} from '@/state/advantage/slice';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
import {X} from 'lucide-react'
import useAdvantageRequirements from './useAdvantageRequirements';

type ModalProps = {
    advantage: Advantage;
    setSelected: (advantage: Advantage|null) => void;
}


export const Modal: React.FC<ModalProps> = ({advantage, setSelected}) => {
    const [open, setOpen] = React.useState(false);
    const {requirements} = useAdvantageRequirements(advantage);

    const handleClose = () => {
        setOpen(false);

        setTimeout(() => setSelected(null), 600)
    }

    useEffect(() => {
        setOpen(!!advantage);
    }, [advantage, setOpen, setSelected]);
    return (
        <Dialog open={open} onOpenChange={change => !change &&  handleClose()}>
            <DialogContent>
                <DialogClose
                    className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity
                    hover:opacity-100 focus:outline-none
                    data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                    onClick={handleClose}
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
                <DialogHeader>
                    <DialogTitle>{advantage && advantage.name}</DialogTitle>
                    <p>Category: {advantage && advantage.category.replaceAll('_', ' ')}</p>
                    <DialogDescription>{advantage && advantage.description}</DialogDescription>
                </DialogHeader>
                <div>
                    <p className="p-0">Requirements:</p>
                    <ul>
                        {requirements && requirements.map((requirement) => (
                            <li
                                key={requirement}
                                className="text-sm text-muted-foreground"
                            >
                                {requirement}
                            </li>
                        ))}
                    </ul>
                </div>
            </DialogContent>
        </Dialog>
    )
}

//     <Modal
//         open={!!selected}
//         onClose={() => { setSelected(null) }}
//         sx={{
//             display:'flex',
//             alignItems:'center',
//             justifyContent:'center',
//         }}
//     >
//         <Card sx={{maxWidth: 500}}>
//             <CardHeader
//                 avatar={selected && <Avatar><IconResolver iconName={categoryIcons[selected.category as AdvantageCategory]} /></Avatar>}
//                 title={selected?.name}
//                 subheader={selected?.category.replace('_', ' ')}
//                 titleTypographyProps={{
//                     color: 'primary',
//                     variant: 'h5'
//                 }}
//                 action={
//                     <IconButton onClick={() => setSelected(null)}>
//                         <IconResolver iconName="Close" />
//                     </IconButton>
//                 }
//             />
//             <CardContent>
//                 <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Description:</Typography>
//                 <Typography variant="body2" sx={{ pb: 2 }}>
//                     {selected?.description}
//                 </Typography>
//
//                 <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{`Requirements${special && special.requirements ? ` (${specialReqsToString(special.requirements)})`:''}:`}</Typography>
//                 {selected?.requirements.map((req: any) => {
//                     const reqString = reqToString(req);
//                     return (
//                         <Typography key={reqString}>{reqString}</Typography>
//                     )
//                 })}
//                 <Typography variant="subtitle1" sx={{ fontWeight: 'bold', pt: 2 }}>Cost: {selected?.cost}</Typography>
//             </CardContent>
//         </Card>
//     </Modal>
