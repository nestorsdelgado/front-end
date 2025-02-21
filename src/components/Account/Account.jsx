import React, { useState, useEffect } from 'react'
import './Account.css'
import EditMixDialog from '../EditMix/EditMixDialog.jsx'
import { BACK_API } from '../../api/index.js'

const Account = () => {
    const [mezclas, setMezclas] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedMezcla, setSelectedMezcla] = useState(null);

    useEffect(() => {
        fetch(`${BACK_API}/Mezclas`)
            .then(response => response.json())
            .then(data => setMezclas(data))
            .catch(error => console.error('Error fetching mezclas:', error))
    }, []);

    const handleDelete = (id) => {
        fetch(`${BACK_API}/Mezclas/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setMezclas(prev => prev.filter(m => m.id !== id))
                } else {
                    console.error('Error deleting mezcla')
                }
            })
            .catch(error => console.error('Error deleting mezcla:', error))
    };

    const handleModify = (mezcla) => {
        console.log('Editing mezcla:', mezcla)
        setSelectedMezcla(mezcla)
        setDialogOpen(true)
    };

    const handleDialogClose = () => {
        setDialogOpen(false)
        setSelectedMezcla(null)
    };

    const handleSave = (updatedFields) => {
        if (!selectedMezcla) return;

        const updatedMezcla = { ...selectedMezcla, ...updatedFields }
        console.log("Saving updated mezcla:", updatedMezcla)

        fetch(`${BACK_API}/Mezclas/${updatedMezcla.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedMezcla)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error updating mezcla')
                }
                return response.json();
            })
            .then(data => {
                console.log('Server response:', data);
                setMezclas(prev =>
                    prev.map(m => (m.id === data.id ? data : m))
                );
                handleDialogClose()
            })
            .catch(error => console.error('Error updating mezcla:', error))
    };

    return (
        <div className="account-container">
            <h2>My Mixes</h2>
            <div className="bloques">
                {mezclas.length === 0 ? (
                    <p>No mezclas found.</p>
                ) : (
                    mezclas.map(mezcla => (
                        <div key={mezcla.id} className="mezcla-card">
                            <div className="mezcla-content">
                                <h3 className="mezcla-title">{mezcla.Nombre}</h3>
                                <p className="mezcla-description">{mezcla.Descripción}</p>
                                <p className="mezcla-proporciones">Proporciones: {mezcla.Proporciones.join(', ')}</p>
                                {mezcla.Sabores && mezcla.Sabores.length > 0 && (
                                    <div className="mezcla-sabores">
                                        <h4>Sabores:</h4>
                                        <ul>
                                            {mezcla.Sabores.map((sabor, index) => (
                                                <ul key={index}>
                                                    <strong>{sabor.Nombre}</strong>: {sabor.Descripcion}
                                                </ul>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="button-container">
                                <button className="btn delete-btn" onClick={() => handleDelete(mezcla.id)}>
                                    Delete
                                </button>
                                <button className="btn modify-btn" onClick={() => handleModify(mezcla)}>
                                    Modify
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {selectedMezcla && (
                <EditMixDialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    mezcla={selectedMezcla}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default Account;
