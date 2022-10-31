import {db} from "./db.server"

export async function getLegs() {
    const query = await db.collection('legs').get()
    const data: any = []
    query.forEach((doc) => {
        data.push({...doc.data(), id: doc.id})
    });

    return data;
}

export async function addLeg(data: any) {
    db.collection('legs').add(data)
}

