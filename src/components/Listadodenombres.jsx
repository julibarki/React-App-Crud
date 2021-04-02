import React, { useState } from 'react'
import uniqid from 'uniqid'

const Listadodenombres = () => {

    const [nombre, setNombre] = useState('')
    const [listanombres, setListaNombres] = useState([])
    const [edicion, setEdicion] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState(null)
    const [exitoso, setExitoso] = useState(null)

    const addNombre = (e) => {
        e.preventDefault()

        if (!nombre.trim()) {
            setError('El campo nombre esta vacio')
            return
        }
        setError(null)
        const nuevoNombre = {
            id: uniqid(),
            tituloNombre: nombre
        }

        setListaNombres([nuevoNombre, ...listanombres])
        setNombre('')
        setExitoso('Se añadio el nombre exitosamente')


    }

    const deleteNombre = (id) => {
        setNombre('')
        const nuevaArray = listanombres.filter(item => item.id != id)
        setListaNombres(nuevaArray)
    }


    const edit = (item) => {
        setError(null)
        setExitoso(null)
        setNombre('')
        setEdicion(true)
        setNombre(item.tituloNombre)
        setId(item.id)

    }

  
    const editNombre = (e) => {

        e.preventDefault()
        if (!nombre.trim()) {
            setError('El campo nombre esta vacio')
            return
        }
        const nuevoArray = listanombres.map(item => item.id === id ? { id: id, tituloNombre: nombre } : item)
        setListaNombres(nuevoArray)
        setEdicion(false)
        setNombre('')
    }


    return (
        <div>
            <h2>App CRUD</h2>
            <div className="row">
                <div className="col">
                    <h2>Listado Nombres</h2>
                    <ul className="list-group">
                        {
                            listanombres.map(item =>
                                <li key="{item.id}" className="list-group-item">
                                    {item.tituloNombre}
                                    <button className="btn btn-danger"
                                        onClick={
                                            () => { deleteNombre(item.id) }}
                                    > BORRAR</button>

                                    <button className="btn btn-primary"
                                        onClick={
                                            () => { edit(item) }}
                                    > EDITAR</button>
                                </li>
                            )
                        }
                    </ul>
                </div>

                <div className="col">
                <div id="desarrollado"><a class="github-button"  href="https://github.com/julibarki"  data-size="large" aria-label="Follow @julibarki on GitHub" 
                > Follow @julibarki</a></div>
                    <h2>{edicion ? "Editar nombre" : "Formulario para Registrar nombre"}</h2>
                    <form onSubmit={edicion ? editNombre : addNombre} className="form-group" >
                        <input onChange={(e) => { setNombre(e.target.value) }}
                            className="form-control mb-3" type="text"
                            placeholder="Introduce tu nombre"
                            value={nombre}
                        />
                        <input className="btn btn-info" type="submit" value={edicion ? "Editar nombre" : "Registrar nombre"} />
                    </form>
                    {
                        error != null ?
                            (
                                <div className="alert alert-danger">{error}</div>
                            ) :


                            exitoso != null ?
                                (
                                    <div className="alert alert-success">{exitoso}</div>
                                ) :
                               <div></div> 
                    
                        
                    }

                </div>

            </div>
            

        </div>
    )
}

export default Listadodenombres