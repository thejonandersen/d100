import React, { useCallback, useEffect, useState } from "react";
import {
    Box, capitalize,
    Card,
    CardContent,
    CardHeader,
    Modal, Skeleton,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material'
import {Power} from '../../state/power/slice'
import IconButton from '@mui/material/IconButton'
import IconResolver from '../../components/IconResolver'
import Typography from '@mui/material/Typography'
import {displayText} from './utils'

type ModalProps = {
    handleClose: () => void;
    power: Power | null;
}

const PowerModal: React.FC<ModalProps> = ({power, handleClose}) => {

    return (
        <Modal
            open={!!power}
            onClose={() => handleClose()}
            sx={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
            }}
        >
            <Card sx={{maxWidth: 500}}>
                <CardHeader
                    title={power?.name}
                    titleTypographyProps={{
                        color: 'primary',
                        variant: 'h5'
                    }}
                    action={
                        <IconButton onClick={() => handleClose()}>
                            <IconResolver iconName="Close" />
                        </IconButton>
                    }
                />
                <CardContent sx={{pt: 0}}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>CP/PP Cost:</Typography>
                        <Typography variant="body2" sx={{ pt: 0.55, pl: 1 }}>
                            {power?.cpCost}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Requirements:</Typography>
                        <Typography variant="body2" sx={{ pt: 0.55, pl: 1 }}>
                            {capitalize(power?.skill || '')} ({power?.requiredSkillScore})
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>AP Cost:</Typography>
                        <Typography variant="body2" sx={{ pt: 0.55, pl: 1 }}>
                            {power?.apCost}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Range:</Typography>
                        <Typography variant="body2" sx={{ pt: 0.55, pl: 1 }}>
                            {power?.range && displayText[power?.range]}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{ power?.areaOfEffect?.type === 'target' ? 'Targets:' : 'Area of Effect:' }</Typography>
                        <Typography variant="body2" sx={{ pt: 0.55, pl: 1 }}>
                            {power?.areaOfEffect?.type === 'target' ? power.areaOfEffect.value : `${capitalize(power?.areaOfEffect.type || '')} ${power?.areaOfEffect.value}` }
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Duration:</Typography>
                        <Typography variant="body2" sx={{ pt: 0.55, pl: 1 }}>
                            {power?.duration && (power?.duration !== 'save_ends' ? displayText[power?.duration] : `${capitalize(power.save || '')} ${displayText[power?.duration]}` )}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Effects:</Typography>
                        {power?.effects && power.effects.map((effect, index) => {
                            type Value = keyof typeof displayText;
                            let type: keyof typeof effect | 'combat_effect' = effect.type;
                            type = type === 'combat_effect' ? 'combatEffect' : type;
                            const value: Value = effect[type as keyof typeof effect] as Value;
                            return (
                                <Typography variant="body2" sx={{ pt: 0.55, pl: index === 0 ? 1 : 0 }}>
                                    {index > 0 && ', '}{value && displayText[value] ? capitalize(displayText[value]) : capitalize(value)} {type === 'damage' && "Damage"} {capitalize(effect.typeModifierLevel || '')}
                                </Typography>
                            )
                        })}
                    </Box>

                </CardContent>
                </Card>
        </Modal>
    )
}

export default PowerModal;
