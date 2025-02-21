import React, { useState, useEffect } from 'react';
import {Dialog,DialogTitle,DialogContent,DialogActions,TextField,Button,IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const EditMixDialog = ({ open, onClose, mezcla, onSave }) => {
    const [formData, setFormData] = useState({
        Nombre: '',
        Descripción: '',
        cardImage: '',
        Sabores: [],
        Proporciones: []
    });

    useEffect(() => {
        if (mezcla) {
            setFormData({
                Nombre: mezcla.Nombre || '',
                Descripción: mezcla.Descripción || '',
                cardImage: mezcla.cardImage || '',
                Sabores: mezcla.Sabores ? mezcla.Sabores.map(s => ({ ...s })) : [],
                Proporciones: mezcla.Proporciones ? [...mezcla.Proporciones] : []
            });
        }
    }, [mezcla]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleProporcionesChange = (e) => {
        const { value } = e.target;
        const parsed = value
            .split(',')
            .map(num => Number(num.trim()))
            .filter(num => !isNaN(num));
        setFormData(prev => ({ ...prev, Proporciones: parsed }));
    };

    const handleSaborChange = (index, field, value) => {
        const newSabores = [...formData.Sabores];
        newSabores[index] = { ...newSabores[index], [field]: value };
        setFormData(prev => ({ ...prev, Sabores: newSabores }));
    };

    const handleAddSabor = () => {
        setFormData(prev => ({ ...prev, Sabores: [...prev.Sabores, { Nombre: '', Descripcion: '' }] }));
    };

    const handleRemoveSabor = (index) => {
        const newSabores = formData.Sabores.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, Sabores: newSabores }));
    };

    const proporcionesString = formData.Proporciones.join(', ');

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Mix</DialogTitle>
            <DialogContent dividers>
                <TextField
                    margin="dense"
                    label="Nombre"
                    name="Nombre"
                    fullWidth
                    value={formData.Nombre}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Descripción"
                    name="Descripción"
                    fullWidth
                    value={formData.Descripción}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Card Image"
                    name="cardImage"
                    fullWidth
                    value={formData.cardImage}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Proporciones (comma separated)"
                    fullWidth
                    value={proporcionesString}
                    onChange={handleProporcionesChange}
                />

                <div style={{ marginTop: '1rem' }}>
                    <h4>Sabores</h4>
                    {formData.Sabores.map((sabor, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '0.5rem'
                            }}
                        >
                            <TextField
                                margin="dense"
                                label="Sabor Nombre"
                                value={sabor.Nombre}
                                onChange={(e) => handleSaborChange(index, 'Nombre', e.target.value)}
                                style={{ marginRight: '0.5rem' }}
                            />
                            <TextField
                                margin="dense"
                                label="Sabor Descripción"
                                value={sabor.Descripcion}
                                onChange={(e) => handleSaborChange(index, 'Descripcion', e.target.value)}
                                style={{ marginRight: '0.5rem' }}
                            />
                            <IconButton onClick={() => handleRemoveSabor(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    ))}
                    <Button onClick={handleAddSabor} variant="outlined" size="small">
                        Add Flavour
                    </Button>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditMixDialog;
