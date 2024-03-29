const { v4: uuid } = require('uuid');
const HTTP_STATUS = require('../../constants/api.constants');
const { HttpError } = require('../../utils/api.utils');

class MemoryContainer {
    constructor(data, resource) {
        this.resource = resource;
        this.data = data;
    }

    static async connect() {
        return {
            success: true,
        }
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        const item = this.data.find((item) => item.id === id);
        if (!item) {
            const message = `${this.resource} with id ${id} does not exist in our records.`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return item;
    }

    save(item) {
        const newItem = {
            id: uuid(),
            ...item,
        };
        this.data.push(newItem);
        return newItem;
    }

    updateById(id, item) {
        const index = this.data.findIndex((item) => item.id === id);
        if (index < 0) {
            const message = `${this.resource} with id ${id} does not exist in our records.`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        const updatedItem = {
            id,
            ...item,
        };
        this.data[index] = updatedItem;
        return updatedItem;
    }

    deleteById(id) {
        const index = this.data.findIndex((item) => item.id == id);
        if (index < 0) {
            const message = `${this.resource} with id ${id} does not exist in our records.`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return this.data.splice(index, 1);
    }
}

module.exports = MemoryContainer;

