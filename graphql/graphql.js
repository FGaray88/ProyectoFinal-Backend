
const { buildSchema } = require('graphql');
const { v4: uuid } = require('uuid');

const schema = buildSchema(`
    type Persona {
        id: ID!,
        nombre: String,
        edad: Int,
    }

    input PersonaInput {
        nombre: String,
        edad: Int,
    }

    type Query {
        getPersonas: [Persona]!,
        getPersonaById(id: ID!): Persona
    }

    type Mutation {
        createPersona(datos: PersonaInput): Persona,
        updatePersona(id: ID!, datos: PersonaInput): Persona,
        deletePersona(id: ID!): Persona
    }`);

class Persona {
    constructor(id, { nombre, edad }) {
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
    }
}

const personMap = new Map();

// Resolvers
const getPersonas = () => {
    const personas = Object.values(personMap);
    return personas;
};

const getPersonaById = ({ id }) => {
    const persona = personMap.get(id);
    if (!persona) {
        throw new Error('Persona not found');
    }
    return persona;
};

const createPersona = ({ datos }) => {
    const id = uuid();
    const newPersona = new Persona(id, datos);
    personMap.set(id, newPersona);
    return newPersona;
};


const updatePersona = ({ id, datos }) => {
    const persona = personMap[id];
    if (!persona) {
        throw new Error('Persona not found');
    }
    const updatedPersona = new Persona(id, datos);
    personMap[id] = updatedPersona;
    return updatedPersona;
}

const deletePersona = ({ id }) => {
    const personToDelete = personMap[id];
    if (!personToDelete) {
        throw new Error('Persona not found');
    }
    delete personMap[id];
    return personToDelete;
};

module.exports = {
    schema,
    getPersonas,
    getPersonaById,
    createPersona,
    updatePersona,
    deletePersona
}