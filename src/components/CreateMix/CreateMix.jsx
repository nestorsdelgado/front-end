import { React, useMemo, useState, useEffect } from 'react'
import { Link, MemoryRouter, Route, Routes, useLocation } from 'react-router'
import axios from 'axios'
import "./CreateMix.css"
import Text from './TextField.jsx'
import Selector from './Selector.jsx'
import SelectList from './SelectList.jsx'
import Button from '@mui/material/Button'
import { fetchSabores } from '../../api/sabores'
import { fetchMezclas } from '../../api/sabores'
import ImagenPred from '../../Images/foto-predeterminada-ticket.png'
import { BACK_API } from '../../api/index.js'
import { useNavigate } from 'react-router-dom';


export default function CreateMix({ sabores }) {

    const [flavourCount, setFlavourCount] = useState(1)
    const [preview, setPreview] = useState(null)
    const [title, setTitle] = useState("")
    const [flavours, setFlavours] = useState([])
    const [proportions, setProportions] = useState([])
    const [description, setDescription] = useState("")
    const [user, setUser] = useState("nestorrsuarezz")
    const [likes, setLikes] = useState(0)
    const [image, setImage] = useState(ImagenPred)
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            if (preview) {
                URL.revokeObjectURL(preview)
            }
            const objectUrl = URL.createObjectURL(file)
            setPreview(objectUrl)
            /* setImage(objectUrl) */
            setImage("/src/Images/foto-predeterminada-ticket.png")
        }
    };

    useEffect(() => {

        return () => {
            if (preview) {
                URL.revokeObjectURL(preview)
            }
        }
    }, [preview])

    const handleSubmit = (e) => {
        e.preventDefault()

        const formattedSabores = flavours.map(flavor => ({
            Nombre: flavor.Sabor || flavor.Nombre,
            Descripcion: flavor.Descripción || flavor.Descripcion,
            Key: flavor.Key,
        }))

        const requestBody = {
            Nombre: title,
            Sabores: formattedSabores,
            Proporciones: proportions.map(Number),
            Descripción: description,
            User: user,
            Likes: likes,
            cardImage: image,
            /* Key: key, */
        }
        axios
            .post(`${BACK_API}/Mezclas`, requestBody)
            .then((response) => {
                setTimeout(() => {
                    navigate("/");
                }, 3000)
            })
            .catch((error) => console.error(error));
    }

    return (
        <>
            <div className='CreateMix'>
                <h6 style={{ transform: 'translateX(7.5vh)', width: '300px' }}>Create Mix</h6>
                <div className='inputs-box'>
                    <Text inputId='outlined-basic' labelInput='Name' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Selector inputId='flavours' flavourCount={flavourCount} setFlavourCount={setFlavourCount} />

                    {Array.from({ length: flavourCount }, (_, i) => (
                        <SelectList key={`flavor-${i}`} sabores={sabores} value={flavours[i] || null} onChange={(newFlavour) => {
                            setFlavours(prev => {
                                const updated = [...prev]
                                updated[i] = newFlavour
                                return updated
                            });
                        }}>
                        </SelectList>
                    ))}
                    {Array.from({ length: flavourCount }, (_, i) => (
                        <Text key={`proportion-${i}`} inputId='number' labelInput='Persentage (%)' value={proportions[i] || ""} onChange={(e) => {
                            const newProp = e.target.value
                            setProportions(prev => {
                                const updated = [...prev]
                                updated[i] = newProp
                                return updated
                            });
                        }} />
                    ))}

                    <Text inputId='outlined-basic' labelInput='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                    <Button variant="contained" component="label">Upload Image <input type="file" accept="image/*" hidden onChange={handleImageChange} /></Button>
                    {preview && (
                        <div>
                            <img
                                src={preview}
                                alt="Selected preview"
                                style={{ width: 'auto', height: '200px', marginTop: 10 }}
                            />
                        </div>
                    )}
                    <Button variant="contained" color="primary" onClick={handleSubmit} style={{margin: '8px'}} >Submit</Button>
                </div>
            </div>
        </>
    );
}

