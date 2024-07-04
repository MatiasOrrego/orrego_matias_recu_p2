import express from "express";

const app = express()

app.use(express.json())

const db = []

app.get("/students", (req, res) => {
    res.json(db)
})

app.get("/students/:id", (req, res) =>{
    const getId = parseInt(req.params.id)
    const getStudents = db.find((e) => e.id === getId)

    if(!getStudents || getStudents === -1){
        return res.status(404).json({"mensaje":"Estudiante no encontrado"})
    }
    
    res.status(200).json(getStudents)

    
})

app.post("/students", (req, res) => {
    const id = new Date().getTime()
    const {fullName, age, curse} = req.body

    const newStudents= {
        "id": id,
        "fullName": fullName,
        "age": parseInt(age),
        "curse": curse
    }

    if ( age === 0 || age < 6 ||  age > 105 ){
        return res.status(400).json({"mensaje":"edad inadecuada"})
    } else if(!fullName.trim() || !curse.trim() || isNaN(age))  {
        return res.status(400).json({"mensaje":"Datos no validos"})
    }  
    
    db.push(newStudents)

    res.status(200).json({"mensaje":"Estudiante agregado exitosamente", newStudents})
})

app.put("/students/:id", (req, res) => {
    const getId = parseInt(req.params.id)
    const students = db.findIndex((e) => e.id === getId)
    const { fullName, curse } = req.body
    const newAge = parseInt(req.body.age)

    if ( newAge === 0 || newAge < 6 ||  newAge > 100 ){
        return res.status(400).json({"mensaje":"edad inadecuada"})
    } else if(!fullName.trim() || !curse.trim() || isNaN(newAge)) {
        return res.status(400).json({"mensaje":"Datos no validos"})
    }
    
    db[students].fullName = fullName
    db[students].curse = curse
    db[students].age = newAge

    res.status(200).json({"mensaje":"Estudiante actualizado", "estudiante": db[students]})
})

app.delete("/students/:id", (req, res) =>{
    const getId = parseInt(req.params.id)
    const getStudents = db.findIndex((e) => e.id === getId)

    if(getStudents === -1){
        return res.status(404).json({"mensaje":"Estudiante no encontrado"})
    }

    db.splice(getStudents)

    res.status(200).json({"mensaje":"Estudiante eliminado con exito"})
})

app.listen(4321, console.log("Servidor Funcionando"))