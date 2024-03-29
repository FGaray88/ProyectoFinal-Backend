const { HTTP_STATUS } = require("../../constants/api.constants");
const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const dbConfig = require("../../db/config")

admin.initializeApp({
    credential: admin.credential.cert(dbConfig.firebase.credentials)
});

class FirebaseContainer {
    constructor(collection) {
        
        const db = getFirestore();
        this.query = db.collection(collection);
    }

    static async connect() {
/*         admin.initializeApp({
            credential: admin.credential.cert(dbConfig.firebase.credentials)
        }); */
    }

    async getAll (){
        const docRef = await this.query.get();
        const documents = docRef.docs;
        return documents.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
    }

    async getById (id){
        const docRef = this.query.doc(id);
        if (!docRef) {
            const message = `Resource with id ${id} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        const document = await docRef.get();
        return {
            id: document.id,
            ...document.data()
        }
    }

    async save (item){
        const docRef = this.query.doc();
        return await docRef.set(item);
    }

    async updateById (id, item){
        const docRef = this.query.doc(id);
        if (!docRef) {
            const message = `Resource with id ${id} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return await docRef.update(item);
    }

    async deleteById (id){
        const docRef = this.query.doc(id);
        await docRef.delete();
        return {
            deletedCount: 1
        }; 
    }

}




module.exports = FirebaseContainer;