const express = require('express');
const {randomInt} = require('node:crypto');

const app = express();
const PORT = 3000

app.use(express.json())

const alunos = [
    { id: 1, nome: 'Ana', curso: 'Computação' },
    { id: 2, nome: 'Maria', curso: 'Sistemas de Informação'},
]

app.get('/alunos', (req, res) => {
    res.json(alunos)
})

app.get('/alunos/:id', (req, res) => {
    const id = req.params.id
    const alunoEncontrado = alunos.find(a => a.id === parseInt(id))
    
    if (alunoEncontrado !== undefined) {
        res.status(200).json(alunoEncontrado)
        return
    }
    res.status(404).send("Aluno não encontrado!")
    
})

app.post('/alunos', (req, res) => {
    const {nome, curso} = req.body

    if (nome === undefined || curso === undefined){
        res.status(400).send("Nome e curso são obrigatórios!")
        return
    }

    const id = randomInt(10, 1000)
    const novoAluno = { id, nome, curso }
    alunos.push(novoAluno)
    res.status(201).json(novoAluno)
})

app.put('/alunos/:id', (req, res) => {
    const id = req.params.id
    const aluno = alunos.find(a => a.id === parseInt(id))

    if (aluno !== undefined) {
        const {nome, curso} = req.body

        if (nome === undefined || curso === undefined){
            res.status(400).send("Nome e curso são obrigatórios!")
            return
        }

        const alunoAtualizado = { ...aluno, nome, curso}
        alunos[alunos.indexOf(aluno)] = alunoAtualizado
        res.status(201).json(alunoAtualizado)
        return
    } 
    res.status(404).send("Aluno não encontrado!")
    
 })

app.delete('/alunos/:id', (req, res) => {
    const id = req.params.id
    const aluno = alunos.findIndex(a => a.id === parseInt(id))

    if (aluno !== -1){
        alunos.splice(aluno,1)
        res.status(200).send("Aluno deletado!")
        return
    } 

    res.status(404).send("Aluno não encontrado!")

})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})