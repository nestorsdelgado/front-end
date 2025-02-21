import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import ImagenPred from '../../Images/foto-predeterminada-ticket.png'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import './MixesCards.css'


export default function MixesCards({ mezclas, setInitialMezclas, loading, error }) {
    return (
        <div className='MixesCard'>
            {mezclas && !loading && !error && mezclas.map((mix) => (
                <Card
                    key={mix.Key}
                    sx={{
                        maxWidth: '221.28px',
                        minWidth: '221.28px',
                        maxHeight: '375px',
                        minHeight: '375px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <CardActionArea sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={mix.cardImage ? mix.cardImage : ImagenPred}
                            alt="mix-image"
                        />
                        <CardContent
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                flexGrow: 1,
                                justifyContent: 'space-between',
                                p: 2
                            }}
                        >
                            <Box>
                                <Typography gutterBottom variant="h5" component="div">
                                    {mix.Nombre}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {mix.Descripción}
                                </Typography>
                                {mix.Sabores && mix.Proporciones && (
                                    <Box mt={1}>
                                        <Typography variant="subtitle2">Sabores:</Typography>
                                        {mix.Sabores.map((sabor, index) => (
                                            <Typography key={sabor.Key} variant="body2">
                                                {sabor.Nombre} - {mix.Proporciones[index]}%
                                            </Typography>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                                <Box display="flex" alignItems="center">
                                    <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        @{mix.User}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <FavoriteIcon sx={{ fontSize: 16, color: 'red', mr: 0.5 }} />
                                    <Typography variant="body2">{mix.Likes}</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    );
}